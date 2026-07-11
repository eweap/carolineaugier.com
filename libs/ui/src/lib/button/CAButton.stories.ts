import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAButton from "./CAButton.vue";

const meta = {
  component: CAButton,
  title: "CAButton",
  render: (args) => ({
    template: `<CAButton v-bind="args">My button</CAButton>`,
  }),
} satisfies Meta<typeof CAButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
