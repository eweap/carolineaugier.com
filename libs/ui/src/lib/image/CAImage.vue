<script setup lang="ts">
import { ImgHTMLAttributes } from "vue";

withDefaults(
  defineProps<{
    src?: string;
    altText?: string;
    loading?: ImgHTMLAttributes["loading"];
  }>(),
  {
    src: undefined,
    altText: undefined,
    loading: "lazy",
  },
);
</script>

<template>
  <div class="group flex items-center justify-center overflow-hidden">
    <img
      v-if="src"
      class="h-full object-cover transition-transform duration-700 group-hover:scale-105"
      :src="src"
      :alt="altText"
      :loading="loading"
    />
  </div>
</template>
