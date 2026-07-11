import { includeIgnoreFile } from "@eslint/compat";
import nx from "@nx/eslint-plugin";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default [
  includeIgnoreFile(gitignorePath),
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    ignores: [
      "**/dist",
      "**/out-tsc",
      "**/vite.config.*.timestamp*",
      "**/vitest.config.*.timestamp*",
      "**/test-output",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.vue"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"],
          depConstraints: [
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: [
                "type:feature",
                "type:ui",
                "type:data-access",
                "type:util",
                "type:types",
              ],
            },
            {
              sourceTag: "type:feature",
              onlyDependOnLibsWithTags: [
                "type:feature",
                "type:ui",
                "type:data-access",
                "type:util",
                "type:types",
              ],
            },
            {
              sourceTag: "type:ui",
              onlyDependOnLibsWithTags: ["type:ui", "type:util", "type:types"],
            },
            {
              sourceTag: "type:data-access",
              onlyDependOnLibsWithTags: [
                "type:data-access",
                "type:util",
                "type:types",
              ],
            },
            {
              sourceTag: "type:util",
              onlyDependOnLibsWithTags: ["type:util", "type:types"],
            },
            {
              sourceTag: "type:types",
              onlyDependOnLibsWithTags: ["type:types"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.json"],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import("jsonc-eslint-parser"),
    },
  },
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.cts",
      "**/*.mts",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.vue",
    ],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    // Override or add rules here
    rules: {
      curly: ["error", "all"],
      "func-style": ["error", "declaration"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];

export const customRules = [
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: await import("@typescript-eslint/parser"),
      },
    },
    rules: {
      "vue/no-undef-components": [
        "error",
        {
          ignorePatterns: ["router-link"],
        },
      ],
      "vue/html-indent": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "always",
          },
        },
      ],
      "vue/padding-line-between-tags": [
        "error",
        [{ blankLine: "always", prev: "*", next: "*" }],
      ],
    },
  },
];
