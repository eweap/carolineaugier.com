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
  @apply appearance-none;
  @apply flex items-center justify-between gap-2;
  @apply uppercase font-semibold;
  @apply cursor-pointer;
  @apply transition-colors duration-150;
}

.button--sm {
  @apply py-1 px-1;
}
.button--md {
  @apply py-1 px-2;
}
.button--lg {
  @apply py-2 px-4;
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
