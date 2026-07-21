import { Tree, formatFiles, generateFiles, updateJson } from "@nx/devkit";
import { libraryGenerator, storybookConfigurationGenerator } from "@nx/vue";
import camelCase from "lodash-es/camelCase";
import toUpper from "lodash-es/toUpper";
import * as path from "path";

import { FeatureLibsGeneratorSchema } from "./schema";

function ensurePackageJson(
  tree: Tree,
  packageJsonPath: string,
  packageName: string,
) {
  if (tree.exists(packageJsonPath)) {
    return;
  }

  tree.write(
    packageJsonPath,
    JSON.stringify(
      {
        name: packageName,
        version: "0.0.1",
        exports: {},
        devDependencies: {},
      },
      null,
      2,
    ),
  );
}

function addCustomRulesToEslintConfig(tree: Tree, eslintConfigPath: string) {
  const eslintConfigContent = tree.read(eslintConfigPath, "utf-8");

  if (!eslintConfigContent || eslintConfigContent.includes("{ customRules }")) {
    return;
  }

  const updatedEslintConfigContent = eslintConfigContent
    .replace(
      /import\s+baseConfig\s+from\s+["']\.\.\/\.\.\/\.\.\/eslint\.config\.mjs["'];/,
      'import baseConfig, { customRules } from "../../../eslint.config.mjs";',
    )
    .replace(
      /import vue from (["'])eslint-plugin-vue\1;\nimport baseConfig, \{ customRules \} from (["'])\.\.\/\.\.\/\.\.\/eslint\.config\.mjs\2;/,
      'import vue from "eslint-plugin-vue";\n\nimport baseConfig, { customRules } from "../../../eslint.config.mjs";',
    )
    .replace(/\n\];\s*$/, "\n  ...customRules,\n];\n");

  if (updatedEslintConfigContent !== eslintConfigContent) {
    tree.write(eslintConfigPath, updatedEslintConfigContent);
  }
}

function addExportsToPackageJson(
  tree: Tree,
  packageJsonPath: string,
  packageName: string,
) {
  ensurePackageJson(tree, packageJsonPath, packageName);

  updateJson(tree, packageJsonPath, (pkgJson) => {
    pkgJson.exports = {
      ".": {
        types: "./src/index.ts",
        import: "./src/index.ts",
        default: "./src/index.ts",
      },
    };
    pkgJson.devDependencies = {};

    return pkgJson;
  });
}

function addSetupFilesToViteConfig(tree: Tree, viteConfigPath: string) {
  const viteConfigContent = tree.read(viteConfigPath, "utf-8");

  if (!viteConfigContent || viteConfigContent.includes("setupFiles:")) {
    return;
  }

  const updatedViteConfigContent = viteConfigContent.replace(
    /(\s+environment:\s+["']jsdom["'],\n)/,
    '$1    setupFiles: ["test-setup.ts"],\n',
  );

  if (updatedViteConfigContent !== viteConfigContent) {
    tree.write(viteConfigPath, updatedViteConfigContent);
  }
}

function addTailwindPluginToFeatureViteConfig(
  tree: Tree,
  viteConfigPath: string,
) {
  const viteConfigContent = tree.read(viteConfigPath, "utf-8");

  if (!viteConfigContent || viteConfigContent.includes("@tailwindcss/vite")) {
    return;
  }

  let updatedViteConfigContent = viteConfigContent;

  if (
    updatedViteConfigContent.includes("nxCopyAssetsPlugin") &&
    updatedViteConfigContent.includes("nxViteTsPaths")
  ) {
    updatedViteConfigContent = updatedViteConfigContent
      .replace(
        /import \{ nxCopyAssetsPlugin \} from "@nx\/vite\/plugins\/nx-copy-assets\.plugin";\nimport \{ nxViteTsPaths \} from "@nx\/vite\/plugins\/nx-tsconfig-paths\.plugin";\nimport vue from "@vitejs\/plugin-vue";\nimport \{ defineConfig \} from "vite";/,
        'import tailwindcss from "@tailwindcss/vite";\nimport vue from "@vitejs/plugin-vue";\nimport { defineConfig } from "vite";',
      )
      .replace(
        /plugins: \[nxViteTsPaths\(\), nxCopyAssetsPlugin\(\["\*\.md"\]\), vue\(\)\],/,
        "plugins: [vue(), tailwindcss()],",
      )
      .replace(
        'reportsDirectory: "../../../coverage/libs/my-ressources/feature",',
        'reportsDirectory: "./test-output/vitest/coverage",',
      )
      .replace(
        /\n\s*\/\/\s*plugins:\s*\[\],/,
        "\n  //   plugins: () => [ nxViteTsPaths() ],",
      );
  } else {
    updatedViteConfigContent = updatedViteConfigContent
      .replace(
        /import vue from "@vitejs\/plugin-vue";/,
        'import tailwindcss from "@tailwindcss/vite";\nimport vue from "@vitejs/plugin-vue";',
      )
      .replace(/plugins:\s*\[vue\(\)\],/, "plugins: [vue(), tailwindcss()],")
      .replace(
        /\n\s*\/\/\s*plugins:\s*\[\],/,
        "\n  //   plugins: () => [ nxViteTsPaths() ],",
      );
  }

  if (updatedViteConfigContent !== viteConfigContent) {
    tree.write(viteConfigPath, updatedViteConfigContent);
  }
}

function addTailwindPluginToViteConfig(tree: Tree, viteConfigPath: string) {
  const viteConfigContent = tree.read(viteConfigPath, "utf-8");

  if (!viteConfigContent || viteConfigContent.includes("@tailwindcss/vite")) {
    return;
  }

  let updatedViteConfigContent = viteConfigContent;

  if (
    updatedViteConfigContent.includes("nxCopyAssetsPlugin") &&
    updatedViteConfigContent.includes("nxViteTsPaths")
  ) {
    updatedViteConfigContent = updatedViteConfigContent
      .replace(
        /import \{ nxCopyAssetsPlugin \} from "@nx\/vite\/plugins\/nx-copy-assets\.plugin";\nimport \{ nxViteTsPaths \} from "@nx\/vite\/plugins\/nx-tsconfig-paths\.plugin";\nimport vue from "@vitejs\/plugin-vue";\nimport \{ defineConfig \} from "vite";/,
        'import tailwindcss from "@tailwindcss/vite";\nimport vue from "@vitejs/plugin-vue";\nimport { defineConfig } from "vite";',
      )
      .replace(
        /plugins: \[nxViteTsPaths\(\), nxCopyAssetsPlugin\(\["\*\.md"\]\), vue\(\)\],/,
        "plugins: [vue(), tailwindcss()],",
      )
      .replace(
        'cacheDir: "../../../node_modules/.vite/libs/my-ressources/ui",',
        'cacheDir: "../../../node_modules/.vite/libs/ui",',
      )
      .replace(/name:\s*"my-ressources-ui",/, 'name: "ui",')
      .replace(
        'reportsDirectory: "../../../coverage/libs/my-ressources/ui",',
        'reportsDirectory: "./test-output/vitest/coverage",',
      )
      .replace(/\n\s*setupFiles:\s*\["test-setup\.ts"\],/, "")
      .replace(
        "  //   plugins: () => [ nxViteTsPaths() ],",
        "  //  plugins: [],",
      );
  } else {
    updatedViteConfigContent = updatedViteConfigContent
      .replace(
        /import vue from "@vitejs\/plugin-vue";/,
        'import tailwindcss from "@tailwindcss/vite";\nimport vue from "@vitejs/plugin-vue";',
      )
      .replace(/plugins:\s*\[vue\(\)\],/, "plugins: [vue(), tailwindcss()],")
      .replace(
        'cacheDir: "../../../node_modules/.vite/libs/my-ressources/ui",',
        'cacheDir: "../../../node_modules/.vite/libs/ui",',
      )
      .replace(/name:\s*"my-ressources-ui",/, 'name: "ui",')
      .replace(
        'reportsDirectory: "../../../coverage/libs/my-ressources/ui",',
        'reportsDirectory: "./test-output/vitest/coverage",',
      )
      .replace(/\n\s*setupFiles:\s*\["test-setup\.ts"\],/, "")
      .replace(
        "  //   plugins: () => [ nxViteTsPaths() ],",
        "  //  plugins: [],",
      );
  }

  if (updatedViteConfigContent !== viteConfigContent) {
    tree.write(viteConfigPath, updatedViteConfigContent);
  }
}

function normalizeStorybookPreviewFile(tree: Tree, projectRoot: string) {
  const storybookPreviewPath = `${projectRoot}/.storybook/preview.ts`;
  const storybookPreviewContent = tree.read(storybookPreviewPath, "utf-8");

  if (storybookPreviewContent === null) {
    return;
  }

  const updatedStorybookPreviewContent = [
    'import type { Preview } from "@storybook/vue3";',
    'import { vueRouter } from "storybook-vue3-router";',
    "",
    'import "./styles.css";',
    "",
    "const preview: Preview = {",
    "  parameters: {",
    '    layout: "centered",',
    "  },",
    "  decorators: [vueRouter()],",
    "};",
    "",
    "export default preview;",
    "",
  ].join("\n");

  if (storybookPreviewContent !== updatedStorybookPreviewContent) {
    tree.write(storybookPreviewPath, updatedStorybookPreviewContent);
  }
}

function normalizeStorybookTsConfigInclude(tree: Tree, projectRoot: string) {
  const tsConfigPath = `${projectRoot}/tsconfig.storybook.json`;

  if (!tree.exists(tsConfigPath)) {
    return;
  }

  const storybookTsConfigContent = JSON.stringify(
    {
      extends: "../../../tsconfig.base.json",
      compilerOptions: {
        outDir: "out-tsc/storybook",
        module: "esnext",
        moduleResolution: "bundler",
        jsx: "preserve",
        types: ["vite/client"],
      },
      exclude: ["src/**/*.spec.ts", "src/**/*.test.ts"],
      include: [
        "src/**/*.stories.ts",
        "src/**/*.stories.js",
        "src/**/*.stories.jsx",
        "src/**/*.stories.tsx",
        "src/**/*.stories.mdx",
        ".storybook/*.js",
        ".storybook/**/*.ts",
      ],
      references: [
        {
          path: "./tsconfig.lib.json",
        },
      ],
    },
    null,
    2,
  );

  const currentContent = tree.read(tsConfigPath, "utf-8");

  if (currentContent !== storybookTsConfigContent) {
    tree.write(tsConfigPath, storybookTsConfigContent + "\n");
  }
}

function normalizeStorybookMainFile(tree: Tree, projectRoot: string) {
  const storybookMainPath = `${projectRoot}/.storybook/main.ts`;
  const storybookMainContent = tree.read(storybookMainPath, "utf-8");

  if (!storybookMainContent) {
    return;
  }

  const updatedStorybookMainContent = storybookMainContent.replace(
    /viteConfigPath:\s*"[^"]+\/vite\.config\.mts"/,
    'viteConfigPath: "vite.config.mts"',
  );

  if (updatedStorybookMainContent !== storybookMainContent) {
    tree.write(storybookMainPath, updatedStorybookMainContent);
  }
}

function addVueIncludeToTsConfigSpec(tree: Tree, projectRoot: string) {
  const tsConfigPath = `${projectRoot}/tsconfig.spec.json`;

  if (!tree.exists(tsConfigPath)) {
    return;
  }

  updateJson(tree, tsConfigPath, (tsConfig) => {
    const include = Array.isArray(tsConfig.include) ? tsConfig.include : [];

    if (!include.includes("src/**/*.vue")) {
      tsConfig.include = [...include, "src/**/*.vue"];
    }

    return tsConfig;
  });
}

function applyCommonLibChanges(
  tree: Tree,
  projectRoot: string,
  packageName: string,
) {
  addCustomRulesToEslintConfig(tree, `${projectRoot}/eslint.config.mjs`);
  addExportsToPackageJson(tree, `${projectRoot}/package.json`, packageName);

  if (tree.exists(`${projectRoot}/vite.config.mts`)) {
    addSetupFilesToViteConfig(tree, `${projectRoot}/vite.config.mts`);
  }
}

export async function generateFeatureLib(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  const projectRoot = `libs/${options.ressourceNamePlural}/feature`;
  const packageName = `@carolineaugier/${options.ressourceNamePlural}`;

  await libraryGenerator(tree, {
    directory: projectRoot,
    linter: "eslint",
    name: options.ressourceNamePlural,
    unitTestRunner: "vitest",
    importPath: packageName,
    tags: "type:feature",
    useProjectJson: false,
  });

  applyCommonLibChanges(tree, projectRoot, packageName);
  addTailwindPluginToFeatureViteConfig(tree, `${projectRoot}/vite.config.mts`);
  addVueIncludeToTsConfigSpec(tree, projectRoot);

  generateFiles(tree, path.join(__dirname, "files", "feature"), projectRoot, {
    ...options,

    camelCase,

    hasFeatureLib: options.libTypes.includes("feature"),
    hasDataAccessLib: options.libTypes.includes("data-access"),
    hasUILib: options.libTypes.includes("ui"),
    hasTypesLib: options.libTypes.includes("types"),
    hasUtilLib: options.libTypes.includes("util"),
  });
  await formatFiles(tree);
}

export async function generateDataAccessLib(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  const projectRoot = `libs/${options.ressourceNamePlural}/data-access`;
  const packageName = `@carolineaugier/${options.ressourceNamePlural}-data-access`;

  await libraryGenerator(tree, {
    directory: projectRoot,
    linter: "eslint",
    name: `${options.ressourceNamePlural}-data-access`,
    unitTestRunner: "vitest",
    importPath: packageName,
    tags: "type:data-access",
    useProjectJson: false,
  });

  applyCommonLibChanges(tree, projectRoot, packageName);

  tree.delete(`${projectRoot}/src/vue-shims.d.ts`);

  generateFiles(
    tree,
    path.join(__dirname, "files", "data-access"),
    projectRoot,
    {
      ...options,

      uppercase: (s: string) => toUpper(s.replace("-", "_")),
    },
  );
  await formatFiles(tree);
}

export async function generateTypesLib(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  const projectRoot = `libs/${options.ressourceNamePlural}/types`;
  const packageName = `@carolineaugier/${options.ressourceNamePlural}-types`;

  await libraryGenerator(tree, {
    directory: projectRoot,
    linter: "eslint",
    name: `${options.ressourceNamePlural}-types`,
    unitTestRunner: "none",
    importPath: packageName,
    tags: "type:types",
    useProjectJson: false,
  });

  applyCommonLibChanges(tree, projectRoot, packageName);

  tree.delete(`${projectRoot}/src/vue-shims.d.ts`);

  generateFiles(
    tree,
    path.join(__dirname, "files", "types"),
    projectRoot,
    options,
  );
  await formatFiles(tree);
}

export async function generateUILib(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  const projectRoot = `libs/${options.ressourceNamePlural}/ui`;
  const name = `${options.ressourceNamePlural}-ui`;
  const packageName = `@carolineaugier/${options.ressourceNamePlural}-ui`;

  await libraryGenerator(tree, {
    directory: projectRoot,
    linter: "eslint",
    name,
    unitTestRunner: "vitest",
    importPath: packageName,
    tags: "type:ui",
    useProjectJson: false,
  });

  await storybookConfigurationGenerator(tree, {
    project: name,
  });
  normalizeStorybookMainFile(tree, projectRoot);
  normalizeStorybookPreviewFile(tree, projectRoot);
  normalizeStorybookTsConfigInclude(tree, projectRoot);

  applyCommonLibChanges(tree, projectRoot, packageName);
  addTailwindPluginToViteConfig(tree, `${projectRoot}/vite.config.mts`);
  addVueIncludeToTsConfigSpec(tree, projectRoot);

  generateFiles(tree, path.join(__dirname, "files", "ui"), projectRoot, {
    ...options,

    camelCase,

    hasUtilLib: options.libTypes.includes("util"),
  });
  await formatFiles(tree);
}

export async function generateUtilLib(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  const projectRoot = `libs/${options.ressourceNamePlural}/util`;
  const packageName = `@carolineaugier/${options.ressourceNamePlural}-util`;

  await libraryGenerator(tree, {
    directory: projectRoot,
    linter: "eslint",
    name: `${options.ressourceNamePlural}-util`,
    unitTestRunner: "vitest",
    importPath: packageName,
    tags: "type:util",
    useProjectJson: false,
  });

  applyCommonLibChanges(tree, projectRoot, packageName);

  tree.delete(`${projectRoot}/src/vue-shims.d.ts`);

  generateFiles(tree, path.join(__dirname, "files", "util"), projectRoot, {
    ...options,

    camelCase,
    uppercase: (s: string) => toUpper(s.replace("-", "_")),
  });
  await formatFiles(tree);
}

export default async function featureLibsGenerator(
  tree: Tree,
  options: FeatureLibsGeneratorSchema,
) {
  if (options.libTypes.includes("feature")) {
    await generateFeatureLib(tree, options);
  }

  if (options.libTypes.includes("data-access")) {
    await generateDataAccessLib(tree, options);
  }

  if (options.libTypes.includes("ui")) {
    await generateUILib(tree, options);
  }

  if (options.libTypes.includes("types")) {
    await generateTypesLib(tree, options);
  }

  if (options.libTypes.includes("util")) {
    await generateUtilLib(tree, options);
  }
}
