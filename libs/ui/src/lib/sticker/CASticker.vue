<script setup lang="ts">
import { type Component } from "vue";

defineProps<{
  icon?: Component | null;
}>();
</script>

<template>
  <div
    class="flex items-center gap-2 bg-black px-4 py-2 text-white text-lg uppercase"
  >
    <div><slot /></div>

    <div
      v-if="icon"
      class="hidden group-hover:block"
    >
      <component :is="icon" />
    </div>
  </div>
</template>
