import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CALazySection from "./CALazySection.vue";

const meta = {
  component: CALazySection,
  title: "CALazySection",
  render: (args) => ({
    components: { CALazySection },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 150vh; display: flex; flex-direction: column; justify-content: flex-end;">
        <CALazySection v-bind="args">
          <div class="p-4 bg-green-100 border border-green-500 text-green-700">
            I am visible now!
          </div>
        </CALazySection>
      </div>
    `,
  }),
} satisfies Meta<typeof CALazySection>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
