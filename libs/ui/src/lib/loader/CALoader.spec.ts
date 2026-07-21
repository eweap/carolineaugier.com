import { mount } from "@vue/test-utils";

import CALoader from "./CALoader.vue";

describe("CALoader", () => {
  it("renders properly", () => {
    const wrapper = mount(CALoader, {});
    expect(wrapper.exists()).toBe(true);
  });
});
