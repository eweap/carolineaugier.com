import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAImage from "./CAImage.vue";

const meta = {
  component: CAImage,
  title: "CAImage",
  args: {
    src: "https://placehold.co/600x400",
    altText: "Placeholder image",
  },
} satisfies Meta<typeof CAImage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
