import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  getWorkspaceDependencies,
  removeUnusedDependencies,
} from "./workspace-deps.js";

describe("workspace deps script", () => {
  it("should collect only @carolineaugier dependencies declared with a workspace: version", () => {
    const dependencies = getWorkspaceDependencies({
      dependencies: {
        "@carolineaugier/common": "workspace:*",
        "@carolineaugier/query": "workspace:^",
        vue: "^3.5.13",
      },
      devDependencies: {
        "@carolineaugier/testing": "workspace:*",
        vitest: "~4.1.0",
      },
      optionalDependencies: {
        "@carolineaugier/ui": "workspace:*",
      },
      peerDependencies: {
        "@carolineaugier/types": "workspace:~",
      },
    });

    expect(dependencies).toEqual([
      { name: "@carolineaugier/common", section: "dependencies" },
      { name: "@carolineaugier/query", section: "dependencies" },
      { name: "@carolineaugier/testing", section: "devDependencies" },
      { name: "@carolineaugier/types", section: "peerDependencies" },
      { name: "@carolineaugier/ui", section: "optionalDependencies" },
    ]);
  });

  it("should remove unused dependencies and drop empty dependency sections", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "workspace-deps-"));
    const packageJsonPath = join(tempDir, "package.json");

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(
        {
          name: "test-package",
          devDependencies: {
            "@carolineaugier/common": "workspace:*",
          },
          dependencies: {
            "@carolineaugier/ui": "workspace:*",
            vue: "^3.5.13",
          },
        },
        null,
        2,
      )}\n`,
    );

    const removedDependenciesCount = removeUnusedDependencies([
      {
        absolutePath: packageJsonPath,
        entries: [
          { name: "@carolineaugier/common", section: "devDependencies" },
          { name: "@carolineaugier/ui", section: "dependencies" },
        ],
        packageJson: {
          name: "test-package",
          devDependencies: {
            "@carolineaugier/common": "workspace:*",
          },
          dependencies: {
            "@carolineaugier/ui": "workspace:*",
            vue: "^3.5.13",
          },
        },
        packageJsonPath: "package.json",
      },
    ]);

    expect(removedDependenciesCount).toBe(2);
    expect(JSON.parse(readFileSync(packageJsonPath, "utf8"))).toEqual({
      name: "test-package",
      dependencies: {
        vue: "^3.5.13",
      },
    });
  });
});
