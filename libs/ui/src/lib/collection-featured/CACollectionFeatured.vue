<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import MoreIcon from "~icons/material-symbols-light/arrow-forward-ios";

import { Collection } from "@carolineaugier/api-types";
import { SHOPIFY_ROUTES } from "@carolineaugier/common";

import CAImage from "../image/CAImage.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";
import CASticker from "../sticker/CASticker.vue";

const props = defineProps<{
  isLoading: boolean;
  collection?: Collection | null;
}>();

const products = computed(
  () => props.collection?.products.edges.map((e) => e.node) ?? [],
);
</script>

<template>
  <CASkeleton
    v-if="isLoading"
    class="w-full h-96"
  />

  <template v-else>
    <div
      v-if="products.length"
      class="grid grid-cols-[1fr_1fr] gap-8"
    >
      <RouterLink
        v-for="(product, index) in products"
        :key="index"
        class="group"
        :to="{
          name: SHOPIFY_ROUTES.ProductDetails.name,
          params: {
            handle: product.handle,
          },
        }"
      >
        <figure class="relative">
          <CAImage
            :src="product.featuredImage?.url"
            :alt-text="product.featuredImage?.altText ?? product.title"
          />

          <figcaption class="absolute bottom-0 left-0">
            <CASticker :icon="MoreIcon">{{ product.title }}</CASticker>
          </figcaption>
        </figure>
      </RouterLink>
    </div>

    <p v-else>No featured products</p>
  </template>
</template>
