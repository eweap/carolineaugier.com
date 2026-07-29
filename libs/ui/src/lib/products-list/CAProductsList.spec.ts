import { mount } from "@vue/test-utils";

import CAProductsList from "./CAProductsList.vue";

describe("CAProductsList", () => {
  it("renders properly", () => {
    const wrapper = mount(CAProductsList, {});
    expect(wrapper.exists()).toBe(true);
  });
});
