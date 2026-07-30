/// <reference types="node" />
import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";

loadEnv({ path: resolve(process.cwd(), "../../.env.local") });

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION;
const storefrontAccessToken = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;

if (!storeDomain) {
  throw new Error(
    "SHOPIFY_STORE_DOMAIN is required to load the Storefront schema",
  );
}

if (!storefrontAccessToken) {
  throw new Error(
    "SHOPIFY_PUBLIC_ACCESS_TOKEN is required to load the Storefront schema",
  );
}

const config: CodegenConfig = {
  schema: [
    {
      [`${storeDomain}/api/${apiVersion}/graphql.json`]: {
        headers: {
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
      },
    },
  ],
  documents: resolve(process.cwd(), "../graphql/**/*.graphql"),
  generates: {
    "./src/lib/__generated__/schema.ts": {
      plugins: ["typescript"],
      config: {
        scalars: {
          URL: "string",
          HTML: "string",
        },
      },
    },
    "./src/lib/__generated__/models.ts": {
      plugins: ["typescript-operations"],
      config: {
        importSchemaTypesFrom: "./src/lib/__generated__/schema",
        preResolveTypes: true,
        scalars: {
          URL: "string",
          HTML: "string",
        },
      },
    },
  },
};

export default config;
