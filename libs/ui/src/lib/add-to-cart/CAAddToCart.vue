<script setup lang="ts">
import { ref } from "vue";
import CartIcon from "~icons/material-symbols-light/add-shopping-cart";

import CAButton from "../button/CAButton.vue";
import CAQuantityPicker from "../quantity-picker/CAQuantityPicker.vue";

withDefaults(
  defineProps<{
    disabled?: boolean;
    isPending?: boolean;
  }>(),
  {
    disabled: false,
    isPending: false,
  },
);

const emit = defineEmits<{
  submit: [quantity: number];
}>();

const quantity = ref(1);

function onSubmit() {
  emit("submit", quantity.value);
}
</script>

<template>
  <form
    class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2"
    @submit.prevent="onSubmit"
  >
    <label
      for="quantity"
      class="col-span-2 uppercase font-medium text-sm cursor-pointer"
    >
      <span>Quantity:</span>
    </label>

    <CAQuantityPicker
      v-model="quantity"
      class="w-48"
    />

    <CAButton
      type="submit"
      size="lg"
      :icon-start="CartIcon"
      :disabled="disabled || isPending"
      >{{ isPending ? "Adding..." : "Add to cart" }}</CAButton
    >
  </form>
</template>
