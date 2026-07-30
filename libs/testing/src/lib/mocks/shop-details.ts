import { ShopDetails } from "@carolineaugier/api-types";

export const SHOP_DETAILS: ShopDetails = {
  name: "Caroline Augier",
  description: "Shop description",
  brand: {
    colors: {
      primary: [
        {
          background: "#ffffff",
          foreground: "#000000",
        },
      ],
      secondary: [
        {
          background: "#000000",
          foreground: "#ffffff",
        },
      ],
    },
    coverImage: {
      image: {
        url: "https://picsum.photos/1920/1080",
        altText: "Cover Image",
      },
    },
    logo: {
      image: {
        url: "https://picsum.photos/200/200",
        altText: "Logo",
      },
    },
    slogan: "Slogan",
  },
};
