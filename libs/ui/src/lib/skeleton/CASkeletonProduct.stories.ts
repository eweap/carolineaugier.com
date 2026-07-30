import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CASkeletonProduct from "./CASkeletonProduct.vue";

const meta = {
  component: CASkeletonProduct,
  title: "Skeleton/CASkeletonProduct",
} satisfies Meta<typeof CASkeletonProduct>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
