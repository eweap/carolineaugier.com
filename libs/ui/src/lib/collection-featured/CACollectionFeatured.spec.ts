import { mount } from "@vue/test-utils";

import CACollectionFeatured from "./CACollectionFeatured.vue";

describe("CACollectionFeatured", () => {
  it("renders properly", () => {
    const wrapper = mount(CACollectionFeatured, {});
    expect(wrapper.exists()).toBe(true);
  });
});
