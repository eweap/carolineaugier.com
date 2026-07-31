import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { MENU } from "@carolineaugier/testing";

import CATopbar from "./CATopbar.vue";

const meta = {
  component: CATopbar,
  title: "CATopbar",
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    components: { CATopbar },
    setup() {
      return { args };
    },
    template: `
    <div class="w-full">
      <CATopbar v-bind="args" />
    </div>
    `,
  }),
  args: {
    logo: {
      url: "https://picsum.photos/seed/picsum/200/50",
      altText: "ALT_TEXT",
    },
    items: MENU.items,
  },
} satisfies Meta<typeof CATopbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
