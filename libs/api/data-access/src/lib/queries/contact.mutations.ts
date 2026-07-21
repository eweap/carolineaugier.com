import { useMutation } from "@tanstack/vue-query";

export function useContact() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; body: string }) => {
      const params = new URLSearchParams({
        "contact[name]": data.name,
        "contact[email]": data.email,
        "contact[body]": data.body,
        form_type: "contact",
        utf8: "✓",
      });

      await fetch(`${import.meta.env.SHOPIFY_STORE_DOMAIN}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
    },
  });
}
