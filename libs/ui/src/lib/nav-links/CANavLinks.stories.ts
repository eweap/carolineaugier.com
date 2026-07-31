import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { MENU } from "@carolineaugier/testing";

import CANavLinks from "./CANavLinks.vue";

const meta = {
  component: CANavLinks,
  title: "CANavLinks",
  args: {
    items: MENU.items,
  },
} satisfies Meta<typeof CANavLinks>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
