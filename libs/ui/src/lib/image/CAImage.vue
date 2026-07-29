<script setup lang="ts">
defineProps<{
  src?: string;
  altText?: string;
}>();
</script>

<template>
  <div class="flex items-center justify-center overflow-hidden">
    <img
      v-if="src"
      class="h-full object-cover transition-transform duration-700 group-hover:scale-105"
      :src="src"
      :alt="altText"
      loading="lazy"
    />
  </div>
</template>
