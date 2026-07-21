import { mount } from "@vue/test-utils";

import CANavLinks from "./CANavLinks.vue";

describe("CANavLinks", () => {
  it("renders properly", () => {
    const wrapper = mount(CANavLinks, {});
    expect(wrapper.exists()).toBe(true);
  });
});
