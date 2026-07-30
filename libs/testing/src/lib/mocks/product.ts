import { CurrencyCode, Product } from "@carolineaugier/api-types";

export function createProductMock(name = "product") {
  return {
    id: `gid://shopify/Product/${name}`,
    handle: name,
    title: name,
    onlineStoreUrl: `https://example.com/products/${name}`,
    featuredImage: {
      url: `https://placehold.co/600x600?text=${name}`,
      altText: `${name} Image`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "10.0",
        currencyCode: CurrencyCode.Eur,
      },
      maxVariantPrice: {
        amount: "20.0",
        currencyCode: CurrencyCode.Eur,
      },
    },
    variants: {
      edges: [
        {
          node: {
            title: "First title",
            price: {
              amount: "10.0",
              currencyCode: CurrencyCode.Eur,
            },
          },
        },
        {
          node: {
            title: "Second title",
            price: {
              amount: "5.0",
              currencyCode: CurrencyCode.Eur,
            },
          },
        },
      ],
    },
  } satisfies Product;
}

export const PRODUCT = createProductMock();

export const PRODUCTS = [
  createProductMock("product-1"),
  createProductMock("product-2"),
  createProductMock("product-with-a-long-name-3"),
  createProductMock("product-4"),
  createProductMock("product-5"),
  createProductMock("product-with-a-long-name-6"),
  createProductMock("product-7"),
  createProductMock("product-8"),
  createProductMock("product-with-a-long-name-9"),
] satisfies Product[];
