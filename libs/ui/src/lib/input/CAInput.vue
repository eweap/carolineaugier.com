<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string;
  }>(),
  {
    type: "text",
  },
);
</script>

<template>
  <template v-if="type === 'textarea'">
    <textarea class="input input--textarea" />
  </template>

  <template v-else>
    <input
      :type="type"
      class="input"
    />
  </template>
</template>

<style scoped>
@reference 'tailwindcss';

.input {
  @apply outline-none;
  @apply block border-2 border-neutral-500 focus-visible:border-black;
  @apply w-full;
  @apply px-4 py-2;
  @apply font-medium;
  @apply transition-colors duration-150;
}
</style>
