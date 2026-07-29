export const SHOPIFY_ROUTES = {
  // General
  Home: {
    name: "home",
    path: "/",
  },
  Contact: {
    name: "contact",
    path: "/pages/contact",
  },
  GenericPage: {
    name: "generic-page",
    path: "/pages/:handle",
  },

  // Collections
  CollectionDetails: {
    name: "collection-details",
    path: "/collections/:handle",
  },

  // Products
  Products: {
    name: "products",
    path: "/collections/all",
  },
  ProductDetails: {
    name: "product-details",
    path: "/products/:handle",
  },
};
