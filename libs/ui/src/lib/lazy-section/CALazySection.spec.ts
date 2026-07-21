import { mount } from "@vue/test-utils";

import CALazySection from "./CALazySection.vue";

describe("CALazySection", () => {
  it("renders properly", () => {
    const wrapper = mount(CALazySection, {});
    expect(wrapper.exists()).toBe(true);
  });
});
