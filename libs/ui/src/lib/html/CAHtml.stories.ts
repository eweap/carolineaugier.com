import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CAHtml from "./CAHtml.vue";

const meta = {
  component: CAHtml,
  title: "CAHtml",
  args: {
    content: "<h1>Hello World</h1><p>This is a <strong>paragraph</strong>.</p>",
  },
} satisfies Meta<typeof CAHtml>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
