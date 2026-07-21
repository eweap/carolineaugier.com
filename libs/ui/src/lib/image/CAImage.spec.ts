import { mount } from "@vue/test-utils";

import CAImage from "./CAImage.vue";

describe("CAImage", () => {
  it("renders properly", () => {
    const wrapper = mount(CAImage, {});
    expect(wrapper.exists()).toBe(true);
  });
});
