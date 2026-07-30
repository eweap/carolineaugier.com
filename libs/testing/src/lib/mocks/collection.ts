import { Collection } from "@carolineaugier/api-types";

import { PRODUCTS } from "./product";

export function createCollectionMock(name = "collection") {
  return {
    id: `gid://shopify/Collection/${name}`,
    handle: name,
    title: name,
    description: `Description of ${name}`,
    image: {
      url: `https://placehold.co/400x600?text=${name}`,
      altText: `${name} Image`,
    },
    products: {
      edges: PRODUCTS.map((p) => ({ node: p })),
    },
  } satisfies Collection;
}

export const COLLECTION = createCollectionMock();
