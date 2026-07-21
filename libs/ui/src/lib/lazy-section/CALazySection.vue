<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    rootMargin?: string;
    threshold?: number;
    once?: boolean;
  }>(),
  {
    rootMargin: "200px",
    threshold: 0,
    once: true,
  },
);

const target = ref<HTMLElement | null>(null);
const visible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([entry]: IntersectionObserverEntry[]) => {
    if (!entry?.isIntersecting) {
      return;
    }

    visible.value = true;

    if (props.once) {
      stop();
    }
  },
  {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
  },
);
</script>

<template>
  <div ref="target">
    <slot v-if="visible" />

    <slot
      v-else
      name="placeholder"
    />
  </div>
</template>
