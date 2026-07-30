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
      <div class="space-y-4">
        <CAButton v-bind="args" size="sm" variant="primary">primary sm</CAButton>
        <CAButton v-bind="args" size="md" variant="primary">primary md</CAButton>
        <CAButton v-bind="args" size="lg" variant="primary">primary lg</CAButton>
      </div>

      <div class="space-y-4">
        <CAButton v-bind="args" size="sm" variant="outline">outline sm</CAButton>
        <CAButton v-bind="args" size="md" variant="outline">outline md</CAButton>
        <CAButton v-bind="args" size="lg" variant="outline">outline lg</CAButton>
      </div>

      <div class="space-y-4">
        <CAButton v-bind="args" size="sm" variant="ghost">ghost sm</CAButton>
        <CAButton v-bind="args" size="md" variant="ghost">ghost md</CAButton>
        <CAButton v-bind="args" size="lg" variant="ghost">ghost lg</CAButton>
      </div>
    </div>
    `,
  }),
} satisfies Meta<typeof CAButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
