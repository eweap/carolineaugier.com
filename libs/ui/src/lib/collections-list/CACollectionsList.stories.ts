import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { COLLECTION } from "@carolineaugier/testing";

import CACollectionsList from "./CACollectionsList.vue";

const meta = {
  component: CACollectionsList,
  title: "CACollectionsList",
  args: {
    isLoading: false,
    collections: [COLLECTION],
  },
} satisfies Meta<typeof CACollectionsList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
} satisfies Story;
