<script setup lang="ts">
import { Page } from "@carolineaugier/api-types";

import CAHtml from "../html/CAHtml.vue";
import CASkeleton from "../skeleton/CASkeleton.vue";
import CATitle from "../title/CATitle.vue";

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
        <CATitle>{{ page.title }}</CATitle>

        <CAHtml :content="page.body" />
      </div>
    </template>
  </div>
</template>
