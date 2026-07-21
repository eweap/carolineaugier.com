import { print } from "graphql";

import { Operations } from "@carolineaugier/api-types";

import { GetShopDetailsDocument } from "../api";
import { client } from "../client";

const shopDetailsQueryKey = ["SHOP_DETAILS"];

export const shopDetailsQueries = {
  getShopDetails: () => ({
    queryKey: shopDetailsQueryKey,
    queryFn: async () => {
      const { data } = await client.request<Operations.GetShopDetailsQuery>(
        print(GetShopDetailsDocument),
      );

      if (!data?.shop) {
        throw new Error("Fail to load shop details");
      }

      return data.shop;
    },
  }),
};
