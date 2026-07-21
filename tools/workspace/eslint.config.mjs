import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  {
    ignores: ["**/out-tsc", "**/__snapshots__"],
  },
  {
    files: ["**/package.json", "**/generators.json"],
    rules: {
      "@nx/nx-plugin-checks": "error",
    },
    languageOptions: {
      parser: await import("jsonc-eslint-parser"),
    },
  },
];
