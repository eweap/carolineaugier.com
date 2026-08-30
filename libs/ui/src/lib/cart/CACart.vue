<script setup lang="ts">
import { ref } from "vue";
import CartHoverIcon from "~icons/material-symbols/shopping-cart-checkout-outline";
import CartIcon from "~icons/material-symbols/shopping-cart-outline";

import { SHOPIFY_ROUTES } from "@carolineaugier/common";

defineProps<{
  totalQuantity?: number;
}>();

const hover = ref(false);
</script>

<template>
  <RouterLink
    class="group relative"
    :to="{
      name: SHOPIFY_ROUTES.Cart.name,
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <component
      :is="!hover ? CartIcon : CartHoverIcon"
      class="size-8"
    />

    <span
      v-if="totalQuantity"
      class="absolute -top-2 -right-2 size-5 flex items-center justify-center rounded-full border bg-white text-xs font-semibold"
      >{{ totalQuantity }}</span
    >
  </RouterLink>
</template>
