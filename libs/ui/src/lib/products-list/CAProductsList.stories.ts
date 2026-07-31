import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PRODUCTS } from "@carolineaugier/testing";

import CAProductsList from "./CAProductsList.vue";

const meta = {
  component: CAProductsList,
  title: "CAProductsList",
  args: {
    isLoading: false,
    products: PRODUCTS,
  },
} satisfies Meta<typeof CAProductsList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
} satisfies Story;
