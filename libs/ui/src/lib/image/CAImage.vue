<script setup lang="ts">
defineProps<{
  src?: string;
  altText?: string;
}>();
</script>

<template>
  <div class="border border-neutral-50 overflow-hidden">
    <img
      v-if="src"
      class="aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
      :src="src"
      :alt="altText"
      loading="lazy"
    />
  </div>
</template>
