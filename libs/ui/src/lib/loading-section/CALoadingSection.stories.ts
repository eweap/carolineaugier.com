import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CALoadingSection from "./CALoadingSection.vue";

const meta = {
  component: CALoadingSection,
  title: "CALoadingSection",
  args: {
    isLoading: false,
  },
  render: (args) => ({
    components: { CALoadingSection },
    setup() {
      return { args };
    },
    template: `
      <CALoadingSection v-bind="args">
        <div class="p-4 border border-dashed border-neutral-300">
          Content is loaded!
        </div>
      </CALoadingSection>
    `,
  }),
} satisfies Meta<typeof CALoadingSection>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
} satisfies Story;
