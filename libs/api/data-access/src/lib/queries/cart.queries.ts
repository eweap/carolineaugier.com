import { print } from "graphql";

import { Cart, Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import { GetCartDocument } from "../api";
import { client } from "../client";

const cartQueryKey = queryKeyFactory("CART");

export const cartQueries = {
  getCart: (id?: string | null) => ({
    queryKey: id ? cartQueryKey.details(id) : cartQueryKey.all,
    queryFn: async (): Promise<Cart | undefined> => {
      const cartId = id ?? window.localStorage.getItem("cartId");

      if (!cartId) {
        return undefined;
      }

      const { data } = await client.request<Operations.GetCartQuery>(
        print(GetCartDocument),
        {
          variables: { id: cartId },
        },
      );

      if (!data?.cart) {
        return undefined;
      }

      return data.cart;
    },
  }),
};
