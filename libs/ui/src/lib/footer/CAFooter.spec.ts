import { mount } from "@vue/test-utils";

import CAFooter from "./CAFooter.vue";

describe("CAFooter", () => {
  it("renders properly", () => {
    const wrapper = mount(CAFooter, {});
    expect(wrapper.exists()).toBe(true);
  });
});
