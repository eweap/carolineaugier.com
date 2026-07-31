import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CASticker from "./CASticker.vue";

const meta = {
  component: CASticker,
  title: "CASticker",
  render: (args) => ({
    components: { CASticker },
    setup() {
      return { args };
    },
    template: `
      <CASticker v-bind="args">
        Sold Out
      </CASticker>
    `,
  }),
} satisfies Meta<typeof CASticker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
