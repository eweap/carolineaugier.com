<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { menusQueries, shopDetailsQueries } from "@carolineaugier/api";
import { CAFooter, CATopbar } from "@carolineaugier/ui";

const { data: mainMenu } = useQuery(menusQueries.getMenu("main-menu"));
const { data: footerMenu } = useQuery(menusQueries.getMenu("footer"));

const { data: shopDetails } = useQuery(shopDetailsQueries.getShopDetails());
</script>

<template>
  <Suspense>
    <div class="grid grid-rows-[auto_1fr_auto] h-full">
      <CATopbar
        :logo="shopDetails?.brand?.logo?.image"
        :items="mainMenu?.items"
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
