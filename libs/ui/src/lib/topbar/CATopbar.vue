<script setup lang="ts">
import CANavLinks from "../nav-links/CANavLinks.vue";

defineProps<{
  logo: string;
  links: {
    label: string;
    href: string;
  }[];
}>();
</script>

<template>
  <div class="p-8 space-y-8">
    <figure class="flex justify-center">
      <img
        class="h-10"
        :src="logo"
        alt="Caroline Augier logo"
        :draggable="false"
      />
    </figure>

    <div class="flex justify-center">
      <CANavLinks :links="links" />
    </div>
  </div>
</template>
