import { mount } from "@vue/test-utils";

import CASticker from "./CASticker.vue";

describe("CASticker", () => {
  it("renders properly", () => {
    const wrapper = mount(CASticker, {});
    expect(wrapper.exists()).toBe(true);
  });
});
