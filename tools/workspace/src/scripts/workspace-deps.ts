import chalk from "chalk";
import {
  type SpawnSyncOptionsWithStringEncoding,
  spawnSync,
} from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const workspaceRoot = process.cwd();
const writeChanges = process.argv.includes("--write");
const workspaceDependencyPrefix = "workspace:";
const dependencySections = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const;
const ignoredDirs = new Set([
  ".git",
  ".nx",
  ".turbo",
  "coverage",
  "dist",
  "e2e-output",
  "node_modules",
  "out-tsc",
  "tmp",
]);
const ignoredFiles = [
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
];
const usageSearchGlobs = [
  "!**/node_modules/**",
  "!**/dist/**",
  "!**/coverage/**",
  "!**/out-tsc/**",
  "!**/e2e-output/**",
  "!**/*.map",
  "!**/*.snap",
  ...ignoredFiles.map((fileName) => `!**/${fileName}`),
];

type DependencySection = (typeof dependencySections)[number];
type WorkspaceDependency = `@carolineaugier/${string}`;

type PackageJson = {
  [key in DependencySection]?: Record<string, string>;
} & Record<string, unknown>;

type DependencyEntry = {
  name: WorkspaceDependency;
  section: DependencySection;
};

type DependencyGroup = {
  packageJsonPath: string;
  entries: DependencyEntry[];
};

type PackageJsonDependencyGroup = DependencyGroup & {
  absolutePath: string;
  packageJson: PackageJson;
};

function colorSection(section: DependencySection): string {
  switch (section) {
    case "dependencies":
      return chalk.blue(section);
    case "devDependencies":
      return chalk.magenta(section);
    case "peerDependencies":
      return chalk.cyan(section);
    case "optionalDependencies":
      return chalk.yellow(section);
  }
}

function isWorkspaceDependency(
  name: string,
  version: string,
): name is WorkspaceDependency {
  return (
    name.startsWith("@carolineaugier/") &&
    version.startsWith(workspaceDependencyPrefix)
  );
}

function runCommand(
  command: string,
  args: string[],
  options: Partial<SpawnSyncOptionsWithStringEncoding> = {},
): string {
  const result = spawnSync(command, args, {
    cwd: workspaceRoot,
    encoding: "utf8",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    throw new Error(
      stderr ||
        `${command} ${args.join(" ")} failed with code ${result.status}`,
    );
  }

  return result.stdout?.trim() ?? "";
}

function findPackageJsonFiles(): string[] {
  try {
    const output = runCommand("rg", ["--files", "-g", "package.json"]);
    return output.length > 0 ? output.split("\n") : [];
  } catch {
    return walkForPackageJson(workspaceRoot).map((filePath) =>
      relative(workspaceRoot, filePath),
    );
  }
}

function walkForPackageJson(dir: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkForPackageJson(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name === "package.json") {
      results.push(fullPath);
    }
  }

  return results;
}

function parsePackageJson(packageJsonPath: string): PackageJson {
  return JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJson;
}

export function getWorkspaceDependencies(
  packageJson: PackageJson,
): DependencyEntry[] {
  const entries: DependencyEntry[] = [];

  for (const section of dependencySections) {
    const dependencies = packageJson[section] ?? {};

    for (const [name, version] of Object.entries(dependencies)) {
      if (isWorkspaceDependency(name, version)) {
        entries.push({ name, section });
      }
    }
  }

  return entries;
}

function listWorkspaceDependencies(
  packageJsonPath: string,
): PackageJsonDependencyGroup | null {
  const absolutePath = resolve(workspaceRoot, packageJsonPath);
  const packageJson = parsePackageJson(absolutePath);
  const entries = getWorkspaceDependencies(packageJson);

  if (entries.length === 0) {
    return null;
  }

  return { absolutePath, entries, packageJson, packageJsonPath };
}

function findUsages(
  packageJsonPath: string,
  dependencyName: WorkspaceDependency,
): string[] {
  const projectDir = dirname(packageJsonPath);
  const args = ["-l", "-F", dependencyName, projectDir, "--hidden"];

  for (const glob of usageSearchGlobs) {
    args.push("--glob", glob);
  }

  const result = spawnSync("rg", args, {
    cwd: workspaceRoot,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status === 1) {
    return [];
  }

  if (result.status !== 0) {
    const stderr = result.stderr.trim();
    throw new Error(stderr || `rg failed while checking ${dependencyName}`);
  }

  return result.stdout.trim().split("\n").filter(Boolean);
}

function printGroups(title: string, groups: DependencyGroup[]): void {
  console.log(`\n${chalk.bold.underline(title)}`);

  if (groups.length === 0) {
    console.log(`  ${chalk.dim("none")}`);
    return;
  }

  for (const group of groups) {
    console.log(`  ${chalk.whiteBright(group.packageJsonPath)}`);
    for (const entry of group.entries) {
      console.log(
        `    ${chalk.gray("- ")}${colorSection(entry.section)} ${chalk.gray("->")} ${chalk.green(entry.name)}`,
      );
    }
  }
}

function syncWorkspaceAfterFix(): void {
  console.log(`\n${chalk.cyan("Running pnpm install...")}`);
  runCommand("pnpm", ["install"], { stdio: "inherit" });

  console.log(`\n${chalk.cyan("Running pnpm nx sync...")}`);
  runCommand("pnpm", ["nx", "sync"], { stdio: "inherit" });
}

export function removeUnusedDependencies(
  groups: PackageJsonDependencyGroup[],
): number {
  let removedDependenciesCount = 0;

  for (const group of groups) {
    for (const entry of group.entries) {
      const dependencies = group.packageJson[entry.section];

      if (!dependencies) {
        continue;
      }

      delete dependencies[entry.name];
      removedDependenciesCount += 1;

      if (Object.keys(dependencies).length === 0) {
        delete group.packageJson[entry.section];
      }
    }

    writeFileSync(
      group.absolutePath,
      `${JSON.stringify(group.packageJson, null, 2)}\n`,
    );
  }

  return removedDependenciesCount;
}

function analyzeWorkspaceDependencies(): {
  allGroups: DependencyGroup[];
  unusedGroups: PackageJsonDependencyGroup[];
} {
  const allGroups: DependencyGroup[] = [];
  const unusedGroups: PackageJsonDependencyGroup[] = [];

  for (const packageJsonPath of findPackageJsonFiles().sort()) {
    const dependencyGroup = listWorkspaceDependencies(packageJsonPath);

    if (!dependencyGroup) {
      continue;
    }

    allGroups.push({
      packageJsonPath,
      entries: dependencyGroup.entries,
    });

    const unusedEntries = dependencyGroup.entries.filter(
      (entry) => findUsages(packageJsonPath, entry.name).length === 0,
    );

    if (unusedEntries.length > 0) {
      unusedGroups.push({
        absolutePath: dependencyGroup.absolutePath,
        entries: unusedEntries,
        packageJson: dependencyGroup.packageJson,
        packageJsonPath,
      });
    }
  }

  return { allGroups, unusedGroups };
}

function main(): void {
  const { allGroups, unusedGroups } = analyzeWorkspaceDependencies();

  printGroups("All @carolineaugier workspace dependencies", allGroups);
  printGroups("Unused @carolineaugier workspace dependencies", unusedGroups);

  if (!writeChanges) {
    return;
  }

  if (unusedGroups.length === 0) {
    console.log(`\n${chalk.green("Nothing to remove.")}`);
    return;
  }

  const removedDependenciesCount = removeUnusedDependencies(unusedGroups);
  console.log(
    `\n${chalk.green("Removed")} ${chalk.bold(removedDependenciesCount.toString())} ${chalk.green("unused dependencies.")}`,
  );

  syncWorkspaceAfterFix();
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === new URL(import.meta.url).pathname
) {
  main();
}
