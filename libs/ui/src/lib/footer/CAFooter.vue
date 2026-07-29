<script setup lang="ts">
import { MenuItem } from "@carolineaugier/api-types";

import CANavLinks from "../nav-links/CANavLinks.vue";

defineProps<{
  logo?: {
    url: string;
    altText?: string | null;
  } | null;
  items: MenuItem[];
}>();
</script>

<template>
  <footer class="p-8 space-y-8">
    <div class="flex justify-center">
      <CANavLinks
        class="text-xs"
        :items="items"
      />
    </div>
  </footer>
</template>
