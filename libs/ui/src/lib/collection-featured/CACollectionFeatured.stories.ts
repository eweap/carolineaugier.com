import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { COLLECTION } from "@carolineaugier/testing";

import CACollectionFeatured from "./CACollectionFeatured.vue";

const meta = {
  component: CACollectionFeatured,
  title: "CACollectionFeatured",
  args: {
    isLoading: false,
    collection: COLLECTION,
  },
} satisfies Meta<typeof CACollectionFeatured>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
} satisfies Story;
