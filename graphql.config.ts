import type { IGraphQLConfig } from "graphql-config";

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

const config: IGraphQLConfig = {
  schema: [
    {
      [`${storeDomain}/api/${apiVersion}/graphql.json`]: {
        headers: {
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
      },
    },
  ],
};

export default config;
