import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { NAV_LINKS } from "../../../.storybook/fixtures/nav-links";
import CATopbar from "./CATopbar.vue";

const meta = {
  component: CATopbar,
  title: "CATopbar",
  args: {
    logo: {
      url: "https://picsum.photos/seed/picsum/200/50",
      altText: "ALT_TEXT",
    },
    items: NAV_LINKS,
  },
} satisfies Meta<typeof CATopbar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
