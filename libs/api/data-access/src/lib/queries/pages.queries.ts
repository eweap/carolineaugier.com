import { print } from "graphql";

import { Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import { GetPageByHandleDocument } from "../api";
import { client } from "../client";

const pagesQueryKey = queryKeyFactory("pages");

export const pagesQueries = {
  getPageByHandle: (handle: string) => ({
    queryKey: pagesQueryKey.details(handle),
    queryFn: async () => {
      const { data } = await client.request<Operations.GetPageByHandleQuery>(
        print(GetPageByHandleDocument),
        {
          variables: { handle },
        },
      );

      return data?.page;
    },
  }),
};
