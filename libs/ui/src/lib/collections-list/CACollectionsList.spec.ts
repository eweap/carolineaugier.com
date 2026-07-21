import { mount } from "@vue/test-utils";

import CACollectionsList from "./CACollectionsList.vue";

describe("CACollectionsList", () => {
  it("renders properly", () => {
    const wrapper = mount(CACollectionsList, {});
    expect(wrapper.exists()).toBe(true);
  });
});
