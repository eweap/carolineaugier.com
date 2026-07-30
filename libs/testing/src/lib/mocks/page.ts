import { Page } from "@carolineaugier/api-types";

export const PAGE: Page = {
  id: "gid://shopify/Page/1",
  handle: "about",
  title: "About",
  body: "<p>About this shop.</p>",
  image: {
    reference: {
      __typename: "MediaImage",
      id: "gid://shopify/MediaImage/1",
      image: {
        url: "https://picsum.photos/1200/800",
        altText: "About Image",
      },
    },
  },
};
