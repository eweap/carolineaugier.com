<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";

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

import { useCartStore } from "../../stores/cart.store";

const props = defineProps<{
  handle: string;
}>();

const { data: productDetails, isLoading } = useQuery(
  productsQueries.getProductDetails(props.handle),
);

const cartStore = useCartStore();
const { addToCartErrorMessage, isAddToCartPending } = storeToRefs(cartStore);

const selectedVariantId = ref<string>();

// Pre-select the first variant if exists
watch(
  () => productDetails.value?.variants.edges,
  (variants) => {
    const firstVariantId = variants?.[0]?.node.id;

    if (!firstVariantId) {
      selectedVariantId.value = undefined;
      return;
    }

    if (
      !selectedVariantId.value ||
      !variants?.some((variant) => variant.node.id === selectedVariantId.value)
    ) {
      selectedVariantId.value = firstVariantId;
    }
  },
  {
    immediate: true,
  },
);

const hasMultipleVariants = computed(() =>
  productDetails.value
    ? productDetails.value?.variants.edges.length > 1
    : false,
);

async function onAddToCart(quantity: number) {
  if (!selectedVariantId.value) {
    return;
  }

  await cartStore.addToCart(selectedVariantId.value, quantity);
}
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
              <div
                v-if="hasMultipleVariants"
                class="space-y-2"
              >
                <CATitle heading="h2">Variants:</CATitle>

                <CAProductVariants
                  v-model="selectedVariantId"
                  :product="productDetails"
                />
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
              <div class="space-y-2">
                <CAAddToCart
                  :disabled="!selectedVariantId"
                  :is-pending="isAddToCartPending"
                  @submit="onAddToCart"
                />

                <p
                  v-if="addToCartErrorMessage"
                  class="text-sm text-red-600"
                >
                  {{ addToCartErrorMessage }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </CALazySection>
</template>
