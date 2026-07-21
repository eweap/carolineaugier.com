import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: import.meta.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: "2026-10",
  publicAccessToken: import.meta.env.SHOPIFY_PUBLIC_ACCESS_TOKEN,
});
