import { print } from "graphql";

import { Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import {
  GetCollectionByHandleDocument,
  GetCollectionsListDocument,
} from "../api";
import { client } from "../client";

const collectionsQueryKey = queryKeyFactory("COLLECTIONS");

export const collectionsQueries = {
  getCollectionsList: () => ({
    queryKey: collectionsQueryKey.list(),
    queryFn: async () => {
      const { data } = await client.request<Operations.GetCollectionsListQuery>(
        print(GetCollectionsListDocument),
      );

      return data?.collections?.edges.map((edge) => edge.node) ?? [];
    },
  }),

  getCollectionDetails: (handle: string) => ({
    queryKey: collectionsQueryKey.details(handle),
    queryFn: async () => {
      const { data } =
        await client.request<Operations.GetCollectionByHandleQuery>(
          print(GetCollectionByHandleDocument),
          {
            variables: { handle },
          },
        );

      return data?.collection;
    },
  }),
};
