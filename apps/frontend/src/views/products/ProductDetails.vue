<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { productsQueries } from "@carolineaugier/api";
import {
  CAAddToCart,
  CAHtml,
  CAImage,
  CALazySection,
  CAProductVariants,
  CASkeleton,
  CATitle,
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
          <div class="grid md:grid-cols-2 gap-8">
            <CAImage
              :src="productDetails.featuredImage?.url"
              :alt-text="
                productDetails.featuredImage?.altText ?? productDetails.title
              "
            />

            <!-- Informations -->
            <div class="space-y-8">
              <!-- Title -->
              <CATitle>{{ productDetails.title }}</CATitle>

              <hr />

              <!-- Variants -->
              <div class="space-y-2">
                <CATitle heading="h2">Variants:</CATitle>

                <CAProductVariants :product="productDetails" />
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <CATitle heading="h2">Description:</CATitle>

                <CAHtml
                  v-if="productDetails.descriptionHtml"
                  :content="productDetails.descriptionHtml"
                />
              </div>

              <!-- Add to cart -->
              <CAAddToCart />
            </div>
          </div>
        </section>
      </div>
    </div>
  </CALazySection>
</template>
