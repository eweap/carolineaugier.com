import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAAddToCart from "./CAAddToCart.vue";

const meta = {
  component: CAAddToCart,
  title: "CAAddToCart",
} satisfies Meta<typeof CAAddToCart>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
