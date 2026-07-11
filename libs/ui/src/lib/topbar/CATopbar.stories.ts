import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CATopbar from "./CATopbar.vue";

const meta = {
  component: CATopbar,
  title: "CATopbar",
  args: {
    logo: "https://picsum.photos/seed/picsum/200/50",
  },
} satisfies Meta<typeof CATopbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
