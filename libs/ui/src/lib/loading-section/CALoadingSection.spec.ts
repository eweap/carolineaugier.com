import { mount } from "@vue/test-utils";

import CALoadingSection from "./CALoadingSection.vue";

describe("CALoadingSection", () => {
  it("renders properly", () => {
    const wrapper = mount(CALoadingSection, {});
    expect(wrapper.exists()).toBe(true);
  });
});
