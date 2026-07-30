import type { Preview } from "@storybook/vue3";
import { vueRouter } from "storybook-vue3-router";

import { SHOPIFY_ROUTES } from "@carolineaugier/common";

import "./styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
  decorators: [
    vueRouter(
      Object.values(SHOPIFY_ROUTES).map((value) => ({
        path: value.path,
        name: value.name,
        component: null as any,
      })),
    ),
  ],
};

export default preview;
