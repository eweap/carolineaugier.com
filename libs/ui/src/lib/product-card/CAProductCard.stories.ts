import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PRODUCT } from "@carolineaugier/testing";

import CAProductCard from "./CAProductCard.vue";

const meta = {
  component: CAProductCard,
  title: "CAProductCard",
  args: {
    product: PRODUCT,
  },
} satisfies Meta<typeof CAProductCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
