<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "outline" | "ghost";
  }>(),
  {
    variant: "primary",
  },
);
</script>

<template>
  <button
    class="button"
    :class="{
      'button--primary': variant === 'primary',
      'button--outline': variant === 'outline',
      'button--ghost': variant === 'ghost',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
@reference 'tailwindcss';

.button {
  @apply appearance-none;
  @apply py-1 px-2;
  @apply uppercase font-semibold;
  @apply cursor-pointer;
  @apply transition-colors duration-150;
}

.button--primary {
  @apply border-2 border-black active:border-neutral-200;
  @apply bg-black hover:bg-white;
  @apply text-white hover:text-black active:text-neutral-700;
}

.button--outline {
  @apply border-2 border-black active:border-neutral-700;
  @apply bg-white hover:bg-black active:bg-neutral-700;
  @apply text-black hover:text-white;
}

.button--ghost {
  @apply border-2 border-transparent;
  @apply bg-transparent;
  @apply text-black hover:underline;
}
</style>
