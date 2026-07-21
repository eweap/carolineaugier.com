import { print } from "graphql";

import { Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import { GetProductByHandleDocument, GetProductsListDocument } from "../api";
import { client } from "../client";

const productsQueryKey = {
  ...queryKeyFactory("PRODUCTS"),
  featured: () => [...productsQueryKey.list(), "FEATURED"],
};

export const productsQueries = {
  getProductsList: () => ({
    queryKey: productsQueryKey.list(),
    queryFn: async () => {
      const { data } = await client.request<Operations.GetProductsListQuery>(
        print(GetProductsListDocument),
      );

      return data?.products?.edges.map((edge) => edge.node) ?? [];
    },
  }),

  getProductDetails: (handle: string) => ({
    queryKey: productsQueryKey.details(handle),
    queryFn: async () => {
      const { data } = await client.request<Operations.GetProductByHandleQuery>(
        print(GetProductByHandleDocument),
        {
          variables: { handle },
        },
      );

      return data?.product;
    },
  }),
};
