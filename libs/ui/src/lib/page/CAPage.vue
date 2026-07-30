<script setup lang="ts">
import { Page } from "@carolineaugier/api-types";

import CAHtml from "../html/CAHtml.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";

defineProps<{
  isLoading: boolean;
  page?: Page | null;
}>();
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <CASkeleton
      v-if="isLoading"
      class="w-full h-64"
    />

    <template v-else>
      <div
        v-if="page"
        class="space-y-4"
      >
        <h1 class="text-2xl uppercase font-semibold">{{ page.title }}</h1>

        <CAHtml :content="page.body" />
      </div>
    </template>
  </div>
</template>
