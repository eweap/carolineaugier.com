<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Product } from "@carolineaugier/api-types";
import {
  SHOPIFY_ROUTES,
  getPrice,
  getPriceRange,
} from "@carolineaugier/common";

import CAImage from "../image/CAImage.vue";
import CAProductVariants from "../product-variants/CAProductVariants.vue";

const props = defineProps<{
  product: Product;
}>();
</script>

<template>
  <RouterLink
    class="group grid grid-rows-subgrid row-span-4 gap-4 bg-neutral-50 p-4"
    :to="{
      name: SHOPIFY_ROUTES.ProductDetails.name,
      params: {
        handle: product.handle,
      },
    }"
  >
    <!-- Image -->
    <CAImage
      class="aspect-square"
      :src="product.featuredImage?.url"
      :alt-text="product.featuredImage?.altText ?? product.title"
    />

    <div class="grid grid-rows-subgrid row-span-3 gap-4 px-2">
      <!-- Title -->
      <div class="uppercase font-light leading-tight">{{ product.title }}</div>

      <!-- Price -->
      <div class="text-sm">{{ getPriceRange(props.product.priceRange) }}</div>

      <!-- Variants -->
      <CAProductVariants
        v-if="product.variants.edges.length > 1"
        class="mx-auto"
        :product="product"
      />
    </div>
  </RouterLink>
</template>
