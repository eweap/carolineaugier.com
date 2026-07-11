import { mount } from "@vue/test-utils";

import CATopbar from "./CATopbar.vue";

describe("CATopbar", () => {
  it("renders properly", () => {
    const wrapper = mount(CATopbar, {});
    expect(wrapper.exists()).toBe(true);
  });
});
