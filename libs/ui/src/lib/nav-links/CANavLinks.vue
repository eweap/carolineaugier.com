<script setup lang="ts">
import { MenuItem } from "@carolineaugier/api-types";

defineProps<{
  items: MenuItem[];
}>();
</script>

<template>
  <nav class="flex flex-wrap gap-4">
    <RouterLink
      v-for="(link, index) in items"
      :key="index"
      :to="link.url ?? '#'"
      >{{ link.title }}</RouterLink
    >
  </nav>
</template>

<style scoped>
@reference "tailwindcss";

a {
  @apply relative outline-none;
  @apply uppercase font-normal text-neutral-700 hover:text-black transition-colors duration-300;
}

/* After */
a::after {
  content: "";
  @apply absolute -bottom-1 left-0;
  @apply w-full h-0.5;
  @apply bg-black;
  @apply opacity-0 duration-300;
}

a:hover::after,
a:focus::after {
  @apply opacity-100;
  transform: translate3d(0, 0.2em, 0);
}

a::after {
  @apply opacity-100;
  transform: scale(0);
  transform-origin: center;
}

a:hover::after,
a:focus::after {
  transform: scale(1);
}
</style>
