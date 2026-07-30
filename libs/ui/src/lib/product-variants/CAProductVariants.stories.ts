import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PRODUCT } from "@carolineaugier/testing";

import CAProductVariants from "./CAProductVariants.vue";

const meta = {
  component: CAProductVariants,
  title: "CAProductVariants",
  args: {
    product: PRODUCT,
  },
} satisfies Meta<typeof CAProductVariants>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
