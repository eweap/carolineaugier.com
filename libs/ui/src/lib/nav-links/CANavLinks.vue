<script setup lang="ts">
defineProps<{
  links: {
    label: string;
    href: string;
  }[];
}>();
</script>

<template>
  <nav class="flex gap-4">
    <RouterLink
      v-for="link in links"
      :to="link.href"
      >{{ link.label }}</RouterLink
    >
  </nav>
</template>

<style scoped>
@reference "tailwindcss";

a {
  @apply relative outline-none uppercase;
}

a::after {
  content: "";
  @apply absolute bottom-0 left-0;
  @apply w-full h-0.5;
  @apply bg-neutral-500;
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
