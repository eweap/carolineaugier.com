import { mount } from "@vue/test-utils";

import CAInput from "./CAInput.vue";

describe("CAInput", () => {
  it("renders properly", () => {
    const wrapper = mount(CAInput, {});
    expect(wrapper.exists()).toBe(true);
  });
});
