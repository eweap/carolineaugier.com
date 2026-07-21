describe("client", () => {
  it("is created", async () => {
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "https://example.com");
    vi.stubEnv("SHOPIFY_PUBLIC_ACCESS_TOKEN", "token");

    const { client } = await import("./client");

    expect(client).toBeTruthy();
  });
});
