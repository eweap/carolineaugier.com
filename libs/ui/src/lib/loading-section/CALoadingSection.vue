<script setup lang="ts">
import CALoader from "../loader/CALoader.vue";

defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <CALoader v-if="isLoading" />

    <slot v-else />
  </div>
</template>
