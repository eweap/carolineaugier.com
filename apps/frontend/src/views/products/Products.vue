<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { productsQueries } from "@carolineaugier/api";
import { CALazySection, CAProductsList } from "@carolineaugier/ui";

const { data: products, isLoading } = useQuery(
  productsQueries.getProductsList(),
);
</script>

<template>
  <CALazySection class="space-y-8">
    <section class="max-w-7xl mx-auto">
      <!-- Title -->
      <h1 class="text-2xl uppercase font-semibold">All products</h1>
    </section>

    <!-- Products -->
    <section class="max-w-7xl mx-auto">
      <CAProductsList
        :is-loading="isLoading"
        :products="products"
      />
    </section>
  </CALazySection>
</template>
