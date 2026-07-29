<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { pagesQueries } from "@carolineaugier/api";
import { CAPage } from "@carolineaugier/ui";

const props = defineProps<{
  handle: string;
}>();

const { data: page, isLoading } = useQuery(
  pagesQueries.getPageByHandle(props.handle),
);
</script>

<template>
  <Suspense>
    <CAPage
      :is-loading="isLoading"
      :page="page"
    />
  </Suspense>
</template>
