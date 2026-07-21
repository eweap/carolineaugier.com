import { mount } from "@vue/test-utils";

import CASkeleton from "./CASkeleton.vue";

describe("CASkeleton", () => {
  it("renders properly", () => {
    const wrapper = mount(CASkeleton, {});
    expect(wrapper.exists()).toBe(true);
  });
});
