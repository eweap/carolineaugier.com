import { print } from "graphql";

import { Operations } from "@carolineaugier/api-types";
import { queryKeyFactory } from "@carolineaugier/api-util";

import { adaptMenu } from "../adapters/menu.adapter";
import { GetMenuDocument } from "../api";
import { client } from "../client";

const menusQueryKey = queryKeyFactory("MENU");

export const menusQueries = {
  getMenu: (handle: string) => ({
    queryKey: menusQueryKey.details(handle),
    queryFn: async () => {
      const { data } = await client.request<Operations.GetMenuQuery>(
        print(GetMenuDocument),
        {
          variables: { handle },
        },
      );

      if (!data?.menu) {
        throw new Error(`Fail to load menu "${handle}"`);
      }

      return adaptMenu(data.menu);
    },
  }),
};
