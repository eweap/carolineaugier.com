<script setup lang="ts">
import { Product } from "@carolineaugier/api-types";
import { getPrice } from "@carolineaugier/common";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="flex items-center justify-start gap-2">
    <div
      v-for="(variant, index) in product.variants.edges"
      :key="index"
      class="size-6 rounded-full bg-neutral-200 hover:bg-neutral-400 transition-colors duration-75"
      :title="`${variant.node.title} - ${getPrice(variant.node.price)}`"
    />
  </div>
</template>
