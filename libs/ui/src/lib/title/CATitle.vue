<script setup lang="ts">
withDefaults(
  defineProps<{
    heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>(),
  {
    heading: "h1",
  },
);
</script>

<template>
  <component
    :is="heading"
    class="uppercase"
    :class="{
      'text-4xl font-light': heading === 'h1',
      'text-xl font-normal text-neutral-700': heading === 'h2',
      'text-md': heading === 'h3',
    }"
    ><slot
  /></component>
</template>
