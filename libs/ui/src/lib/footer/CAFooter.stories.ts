import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { MENU_ITEM } from "@carolineaugier/testing";

import CAFooter from "./CAFooter.vue";

const meta = {
  component: CAFooter,
  title: "CAFooter",
  args: {
    items: [MENU_ITEM],
    logo: {
      url: "https://placehold.co/100x40",
      altText: "Logo",
    },
  },
} satisfies Meta<typeof CAFooter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
