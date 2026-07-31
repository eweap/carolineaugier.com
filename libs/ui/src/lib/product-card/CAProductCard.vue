<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Product } from "@carolineaugier/api-types";
import { SHOPIFY_ROUTES, getPriceRange } from "@carolineaugier/common";

import CAImage from "../image/CAImage.vue";
import CAProductVariants from "../product-variants/CAProductVariants.vue";

const props = defineProps<{
  product: Product;
}>();
</script>

<template>
  <RouterLink
    class="product-card group flex flex-col h-full gap-4"
    :to="{
      name: SHOPIFY_ROUTES.ProductDetails.name,
      params: {
        handle: product.handle,
      },
    }"
    :title="product.title"
  >
    <!-- Image -->
    <CAImage
      class="aspect-square"
      :src="product.featuredImage?.url"
      :alt-text="product.featuredImage?.altText ?? product.title"
    />

    <div class="product-card__details flex flex-1 flex-col gap-4">
      <!-- Title -->
      <div class="uppercase font-light leading-tight">{{ product.title }}</div>

      <div class="space-y-4">
        <!-- Price -->
        <div class="text-sm">{{ getPriceRange(props.product.priceRange) }}</div>

        <!-- Variants -->
        <div
          v-if="product.variants.edges.length > 1"
          class="mx-auto w-fit"
        >
          <CAProductVariants :product="product" />
        </div>
      </div>
    </div>
  </RouterLink>
</template>
