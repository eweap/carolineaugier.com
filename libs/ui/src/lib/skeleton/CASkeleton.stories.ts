import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CASkeleton from "./CASkeleton.vue";

const meta = {
  component: CASkeleton,
  title: "Skeleton/CASkeleton",
} satisfies Meta<typeof CASkeleton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    class: "w-full h-8",
  },
} satisfies Story;
