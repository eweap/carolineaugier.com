<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { collectionsQueries } from "@carolineaugier/api";
import { CALazySection, CAProductsList, CASkeleton } from "@carolineaugier/ui";

const props = defineProps<{
  handle: string;
}>();

const { data: collectionDetails, isLoading } = useQuery(
  collectionsQueries.getCollectionDetails(props.handle),
);

const products = computed(
  () => collectionDetails.value?.products.edges.map((e) => e.node) ?? [],
);
</script>

<template>
  <CALazySection>
    <CASkeleton v-if="isLoading" />

    <div v-else>
      <div
        v-if="collectionDetails"
        class="space-y-4"
      >
        <section class="max-w-7xl mx-auto">
          <!-- Title -->
          <h1 class="text-2xl uppercase font-semibold">
            {{ collectionDetails.title }}
          </h1>

          <!-- Description -->
          <p v-if="collectionDetails.description">
            {{ collectionDetails.description }}
          </p>
        </section>

        <!-- Image -->
        <div class="group flex items-center h-96 overflow-hidden">
          <img
            v-if="collectionDetails.image?.url"
            class="transition-transform duration-700 group-hover:scale-105"
            :src="collectionDetails.image?.url"
            :alt="collectionDetails.image?.altText ?? collectionDetails.title"
            loading="lazy"
          />
        </div>

        <!-- Products -->
        <section class="max-w-7xl mx-auto">
          <CAProductsList :products="products" />
        </section>
      </div>
    </div>
  </CALazySection>
</template>
