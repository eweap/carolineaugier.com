<script setup lang="ts">
import { computed } from "vue";

import { Product } from "@carolineaugier/api-types";
import { getPrice } from "@carolineaugier/common";

const props = defineProps<{
  product: Product;
}>();

const model = defineModel<string>();

const selectedVariant = computed(() =>
  model.value
    ? props.product.variants.edges.find((e) => e.node.id === model.value)
    : null,
);
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-start gap-2">
      <button
        v-for="variant in product.variants.edges"
        :key="variant.node.id"
        type="button"
        class="size-6 rounded-full border border-transparent bg-neutral-200 hover:bg-neutral-400 cursor-pointer transition-colors duration-75"
        :class="{
          'border-black bg-neutral-600': model === variant.node.id,
        }"
        :title="`${variant.node.title} - ${getPrice(variant.node.price)}`"
        @click="model = variant.node.id"
      />
    </div>

    <div class="space-x-2">
      <span class="font-medium">Selected variant:</span>

      <span>{{ selectedVariant?.node.title }}</span>
    </div>
  </div>
</template>
