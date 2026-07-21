import { queryKeyFactory } from "./query-key-factory";

describe("queryKeyFactory", () => {
  it("builds the shared query keys for an entity", () => {
    const queryKeys = queryKeyFactory("products");

    expect(queryKeys.all).toEqual(["products"]);
    expect(queryKeys.list()).toEqual(["products", "LIST"]);
    expect(queryKeys.details("123")).toEqual(["products", "123"]);
  });

  it("returns new arrays for derived keys", () => {
    const queryKeys = queryKeyFactory("menu");

    expect(queryKeys.list()).not.toBe(queryKeys.all);
    expect(queryKeys.details("abc")).not.toBe(queryKeys.all);
  });
});
