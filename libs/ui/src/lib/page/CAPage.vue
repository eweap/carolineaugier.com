<script setup lang="ts">
import { Product } from "@carolineaugier/api-types";

defineProps<{
  isLoading: boolean;
  featuredProducts?: {
    id: string;
    title: string | null | undefined;
    product: Product;
  }[];
}>();
</script>

<template>
  <div
    v-if="featuredProducts?.length"
    class="grid grid-cols-4"
  >
    <figure
      v-for="featuredProduct in featuredProducts"
      :key="featuredProduct.product.id"
      class="relative"
    >
      <img
        v-if="featuredProduct.product.featuredImage"
        class="aspect-square"
        :src="featuredProduct.product.featuredImage.url"
        :alt="
          featuredProduct.product.featuredImage.altText ??
          featuredProduct.title ??
          featuredProduct.product.title
        "
        loading="lazy"
      />

      <figcaption
        class="absolute bottom-0 left-0 bg-black px-4 py-2 text-white text-lg uppercase"
      >
        {{ featuredProduct.title ?? featuredProduct.product?.title }}
      </figcaption>
    </figure>
  </div>

  <p v-else>No featured products</p>
</template>
