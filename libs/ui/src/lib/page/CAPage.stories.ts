import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PAGE } from "@carolineaugier/testing";

import CAPage from "./CAPage.vue";

const meta = {
  component: CAPage,
  title: "CAPage",
  args: {
    isLoading: false,
    page: PAGE,
  },
} satisfies Meta<typeof CAPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
} satisfies Story;
