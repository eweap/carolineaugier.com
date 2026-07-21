import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAButton from "./CAButton.vue";

const meta = {
  component: CAButton,
  title: "CAButton",
  render: (args) => ({
    components: { CAButton },
    setup() {
      return { args };
    },
    template: `
    <div class="flex items-center gap-4">
      <CAButton v-bind="args" variant="primary">Primary</CAButton>
      <CAButton v-bind="args" variant="outline">Outline</CAButton>
      <CAButton v-bind="args" variant="ghost">Ghost</CAButton>
    </<div>
    `,
  }),
} satisfies Meta<typeof CAButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
