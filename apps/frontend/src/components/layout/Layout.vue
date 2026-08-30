<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";

import {
  Cart,
  cartQueries,
  menusQueries,
  shopDetailsQueries,
} from "@carolineaugier/api";
import { CAFooter, CATopbar } from "@carolineaugier/ui";

import { useCartStore } from "../../stores/cart.store";

const { data: mainMenu } = useQuery(menusQueries.getMenu("main-menu"));
const { data: footerMenu } = useQuery(menusQueries.getMenu("footer"));

const { data: shopDetails } = useQuery(shopDetailsQueries.getShopDetails());

const cartStore = useCartStore();
const { cartId } = storeToRefs(cartStore);

const { data: cart } = useQuery<Cart | undefined>(
  computed(() => cartQueries.getCart(cartId.value)),
);
</script>

<template>
  <Suspense>
    <div class="grid grid-rows-[auto_1fr_auto] h-full">
      <CATopbar
        :logo="shopDetails?.brand?.logo?.image"
        :items="mainMenu?.items"
        :cart="cart"
      />

      <main class="px-8">
        <router-view />
      </main>

      <CAFooter
        v-if="footerMenu"
        :items="footerMenu.items"
      />
    </div>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
