<script setup lang="ts">
import { CATopbar } from "@carolineaugier/ui";

import { NAV_LINKS } from "../../constants/nav-links";
</script>

<template>
  <div>
    <CATopbar
      logo="assets/logo.png"
      :links="NAV_LINKS"
    />

    <router-view />
  </div>
</template>
