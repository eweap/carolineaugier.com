<script setup lang="ts">
import { Product } from "@carolineaugier/api-types";

import CAProductCard from "../product-card/CAProductCard.vue";
import CASkeletonProduct from "../skeleton/CASkeletonProduct.vue";

defineProps<{
  isLoading?: boolean;
  products?: Product[] | null;
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
  >
    <template v-if="isLoading">
      <CASkeletonProduct
        v-for="(_, index) in 10"
        :key="index"
      />
    </template>

    <template v-else>
      <!-- List -->
      <template v-if="(products ?? []).length">
        <CAProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </template>

      <p v-else>No products</p>
    </template>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

:deep(.product-card) {
  @apply grid grid-rows-subgrid row-span-4;
}

:deep(.product-card__details) {
  @apply grid grid-rows-subgrid row-span-3;
}
</style>
