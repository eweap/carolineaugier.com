import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAInput from "./CAInput.vue";

const meta = {
  component: CAInput,
  title: "CAInput",
  render: (args) => ({
    components: { CAInput },
    setup() {
      return { args };
    },
    template: `
    <div class="flex items-center gap-4">
      <CAInput v-bind="args" />
    </div>
    `,
  }),
} satisfies Meta<typeof CAInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
