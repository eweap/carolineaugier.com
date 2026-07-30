<script setup lang="ts">
import { RouterLink } from "vue-router";
import MoreIcon from "~icons/material-symbols-light/arrow-forward-ios";

import { Collection } from "@carolineaugier/api-types";
import { SHOPIFY_ROUTES } from "@carolineaugier/common";

import CAImage from "../image/CAImage.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";
import CASticker from "../sticker/CASticker.vue";
import CATitle from "../title/CATitle.vue";

defineProps<{
  isLoading: boolean;
  collections?: Collection[] | null;
}>();
</script>

<template>
  <div class="space-y-4">
    <CATitle>Collections</CATitle>

    <CASkeleton
      v-if="isLoading"
      class="w-full h-64"
    />

    <div v-else>
      <!-- List -->
      <div
        v-if="(collections ?? []).length"
        class="grid grid-cols-4 gap-8"
      >
        <RouterLink
          v-for="(collection, index) in collections"
          :key="index"
          class="group"
          :to="{
            name: SHOPIFY_ROUTES.CollectionDetails.name,
            params: {
              handle: collection.handle,
            },
          }"
        >
          <figure class="relative bg-white size-full">
            <CAImage
              class="aspect-square"
              :src="collection.image?.url"
              :alt-text="collection.image?.altText ?? collection.title"
            />

            <figcaption class="absolute bottom-0 left-0">
              <CASticker :icon="MoreIcon">{{ collection.title }}</CASticker>
            </figcaption>
          </figure>
        </RouterLink>
      </div>

      <p v-else>No collections</p>
    </div>
  </div>
</template>
