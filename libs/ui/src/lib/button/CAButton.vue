<script setup lang="ts">
import { type Component } from "vue";

withDefaults(
  defineProps<{
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    iconStart?: Component;
    iconEnd?: Component;
  }>(),
  {
    variant: "primary",
    size: "md",
    iconStart: undefined,
    iconEnd: undefined,
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
      'button--sm': size === 'sm',
      'button--md': size === 'md',
      'button--lg': size === 'lg',
    }"
  >
    <component
      :is="iconStart"
      v-if="iconStart"
    />

    <span><slot /></span>

    <component
      :is="iconEnd"
      v-if="iconEnd"
    />
  </button>
</template>

<style scoped>
@reference 'tailwindcss';

.button {
  @apply appearance-none outline-none;
  @apply flex items-center justify-center gap-2;
  @apply uppercase font-semibold  focus-visible:underline;
  @apply cursor-pointer;
  @apply transition-colors duration-150;
}

.button--sm {
  @apply py-0 px-2;
  @apply text-sm;
}
.button--md {
  @apply py-1 px-4;
  @apply text-base;
}
.button--lg {
  @apply py-4 px-8;
  @apply text-lg;
}

.button--primary {
  @apply border-2 border-black active:border-neutral-200;
  @apply bg-black hover:bg-white;
  @apply text-white hover:text-black active:text-neutral-700 focus-visible:underline;
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
