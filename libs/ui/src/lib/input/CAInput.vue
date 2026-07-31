<script setup lang="ts" generic="T">
withDefaults(
  defineProps<{
    modelValue?: T;
    id?: string;
    type?: string;
    pattern?: string;
    min?: number;
  }>(),
  {
    id: undefined,
    type: "text",
    pattern: undefined,
    min: undefined,
  },
);

const model = defineModel<T>();
</script>

<template>
  <template v-if="type === 'textarea'">
    <textarea class="input input--textarea" />
  </template>

  <template v-else>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :pattern="pattern"
      :min="min"
      class="input"
    />
  </template>
</template>

<style scoped>
@reference 'tailwindcss';

.input {
  @apply outline-none;
  @apply block border-2 focus-visible:bg-neutral-100;
  @apply w-full;
  @apply px-4 py-2;
  @apply font-medium;
  @apply transition-colors duration-150;
}
</style>
