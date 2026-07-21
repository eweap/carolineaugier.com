import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { NAV_LINKS } from "../../../.storybook/fixtures/nav-links.js";
import CANavLinks from "./CANavLinks.vue";

const meta = {
  component: CANavLinks,
  title: "CANavLinks",
  args: {
    items: NAV_LINKS,
  },
} satisfies Meta<typeof CANavLinks>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
