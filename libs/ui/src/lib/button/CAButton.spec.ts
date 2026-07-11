import { mount } from "@vue/test-utils";

import CAButton from "./CAButton.vue";

describe("CAButton", () => {
  it("renders properly", () => {
    const wrapper = mount(CAButton, {});
    expect(wrapper.exists()).toBe(true);
  });
});
