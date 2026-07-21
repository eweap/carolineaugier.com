import { mount } from "@vue/test-utils";

import CAPage from "./CAPage.vue";

describe("CAPage", () => {
  it("renders properly", () => {
    const wrapper = mount(CAPage, {});
    expect(wrapper.exists()).toBe(true);
  });
});
