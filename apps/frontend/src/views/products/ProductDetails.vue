<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import CartIcon from "~icons/material-symbols-light/add-shopping-cart";

import { productsQueries } from "@carolineaugier/api";
import {
  CAButton,
  CAHtml,
  CAImage,
  CALazySection,
  CAProductVariants,
  CASkeleton,
} from "@carolineaugier/ui";

const props = defineProps<{
  handle: string;
}>();

const { data: productDetails, isLoading } = useQuery(
  productsQueries.getProductDetails(props.handle),
);
</script>

<template>
  <CALazySection>
    <CASkeleton v-if="isLoading" />

    <div v-else>
      <div
        v-if="productDetails"
        class="space-y-4"
      >
        <section class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-4">
            <CAImage
              :src="productDetails.featuredImage?.url"
              :alt-text="
                productDetails.featuredImage?.altText ?? productDetails.title
              "
            />

            <!-- Informations -->
            <div class="space-y-8">
              <!-- Title -->
              <h1 class="text-2xl uppercase font-semibold">
                {{ productDetails.title }}
              </h1>

              <hr />

              <!-- Variants -->
              <div class="space-y-2">
                <h2 class="uppercase font-semibold">Variants:</h2>

                <CAProductVariants :product="productDetails" />
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <h2 class="uppercase font-semibold">Description:</h2>

                <CAHtml
                  v-if="productDetails.descriptionHtml"
                  :content="productDetails.descriptionHtml"
                />
              </div>

              <CAButton :icon-start="CartIcon">Add to cart</CAButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  </CALazySection>
</template>
