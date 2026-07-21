<script setup lang="ts">
import { MenuItem } from "@carolineaugier/api-types";

import CANavLinks from "../nav-links/CANavLinks.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";

defineProps<{
  logo?: {
    url: string;
    altText?: string | null;
  } | null;
  items?: MenuItem[];
}>();
</script>

<template>
  <div class="p-8 flex flex-col lg:flex-row items-center gap-8">
    <!-- Logo -->
    <div class="shrink-0">
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
    </div>

    <!-- Menu  -->
    <div class="relative lg:-left-32 grow flex justify-center">
      <CANavLinks
        v-if="items"
        :items="items"
      />

      <CASkeleton
        v-else
        class="w-96 h-8"
      />
    </div>
  </div>
</template>
