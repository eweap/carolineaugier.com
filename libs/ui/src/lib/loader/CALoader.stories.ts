import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CALoader from "./CALoader.vue";

const meta = {
  component: CALoader,
  title: "CALoader",
} satisfies Meta<typeof CALoader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
