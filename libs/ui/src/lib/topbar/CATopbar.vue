<script setup lang="ts">
import { Cart, MenuItem } from "@carolineaugier/api-types";
import { SHOPIFY_ROUTES } from "@carolineaugier/common";

import CACart from "../cart/CACart.vue";
import CANavLinks from "../nav-links/CANavLinks.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";

defineProps<{
  logo?: {
    url: string;
    altText?: string | null;
  } | null;
  items?: MenuItem[];
  cart?: Cart;
}>();
</script>

<template>
  <div class="p-8 grid grid-cols-[auto_1fr_auto] items-center gap-8">
    <!-- Logo -->
    <div class="shrink-0 z-10">
      <RouterLink
        :to="{
          name: SHOPIFY_ROUTES.Home.name,
        }"
      >
        <figure v-if="logo">
          <img
            class="w-64 mx-auto lg:mx-0"
            :src="logo.url"
            :alt="logo.altText ?? undefined"
            :draggable="false"
          />
        </figure>

        <CASkeleton
          v-else
          class="w-96 h-12"
        />
      </RouterLink>
    </div>

    <!-- Menu  -->
    <div class="relative lg:-left-32 grow flex justify-center">
      <CANavLinks
        v-if="items"
        class="text-lg"
        :items="items"
      />

      <CASkeleton
        v-else
        class="w-96 h-8"
      />
    </div>

    <!-- Cart -->
    <div>
      <CACart :total-quantity="cart?.totalQuantity" />
    </div>
  </div>
</template>
