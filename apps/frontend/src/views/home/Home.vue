<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { collectionsQueries } from "@carolineaugier/api";
import { SHOPIFY_HANDLES } from "@carolineaugier/common";
import {
  CACollectionFeatured,
  CACollectionsList,
  CALazySection,
} from "@carolineaugier/ui";

const { data: collections, isLoading: isCollectionsLoading } = useQuery(
  collectionsQueries.getCollectionsList(),
);
const { data: featuredCollection, isLoading } = useQuery(
  collectionsQueries.getCollectionDetails(SHOPIFY_HANDLES.collections.featured),
);
</script>

<template>
  <div class="space-y-16">
    <CALazySection>
      <section class="max-w-7xl mx-auto">
        <CACollectionFeatured
          :is-loading="isLoading"
          :collection="featuredCollection"
        />
      </section>
    </CALazySection>

    <CALazySection>
      <section class="max-w-7xl mx-auto">
        <CACollectionsList
          :is-loading="isCollectionsLoading"
          :collections="
            collections?.filter(
              (c) => c.handle !== SHOPIFY_HANDLES.collections.featured,
            )
          "
        />
      </section>
    </CALazySection>
  </div>
</template>
