import { Menu } from "@carolineaugier/api-types";

export function adaptMenu(menu: Menu): Menu {
  return {
    ...menu,
    items: menu.items.map((i) => {
      let url: string | null = i.url;

      if (i.url) {
        try {
          url = new URL(i.url).pathname;
        } catch (error) {
          console.error(`Fail to adapt menu item url ${i.url}`, error);
          url = null;
        }
      }

      return {
        ...i,
        url,
      };
    }),
  };
}
