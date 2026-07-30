<script setup lang="ts">
defineProps<{
  content?: string | null;
}>();
</script>

<template>
  <div
    class="space-y-2"
    v-html="content"
  />
</template>
