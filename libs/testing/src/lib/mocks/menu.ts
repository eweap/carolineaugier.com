import { Menu, MenuItem, MenuItemType } from "@carolineaugier/api-types";

export function createMenuItemMock(name = "menu-item") {
  return {
    title: name,
    type: MenuItemType.Page,
    url: `/pages/${name}`,
  } satisfies MenuItem;
}

export const MENU_ITEM = createMenuItemMock();

export const MENU: Menu = {
  items: [
    createMenuItemMock("home"),
    createMenuItemMock("shop"),
    createMenuItemMock("contact"),
  ],
};
