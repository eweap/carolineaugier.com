import { computed } from "vue";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import { useAddCartLines, useCreateCart } from "@carolineaugier/api";

const CART_ID_STORAGE_KEY = "cartId";

export const useCartStore = defineStore("cart", () => {
  const cartId = useStorage<string | null>(CART_ID_STORAGE_KEY, null);
  const {
    mutateAsync: createCart,
    isPending: isCreateCartPending,
    error: createCartErrors,
  } = useCreateCart();
  const {
    mutateAsync: addCartLines,
    isPending: isAddCartLinesPending,
    error: addCartLinesErrors,
  } = useAddCartLines();

  const isAddToCartPending = computed(
    () => isCreateCartPending.value || isAddCartLinesPending.value,
  );

  const addToCartErrorMessage = computed(
    () => createCartErrors.value?.message ?? addCartLinesErrors.value?.message,
  );

  function setCartId(nextCartId: string | null) {
    cartId.value = nextCartId;
  }

  function clearCart() {
    cartId.value = null;
  }

  async function addToCart(merchandiseId: string, quantity: number) {
    const lines = [{ merchandiseId, quantity }];

    if (!cartId.value) {
      const cart = await createCart({ lines });

      setCartId(cart.id);

      return cart;
    }

    return addCartLines({
      cartId: cartId.value,
      lines,
    });
  }

  return {
    cartId,
    setCartId,
    clearCart,

    addToCart,
    isAddToCartPending,
    addToCartErrorMessage,
  };
});
