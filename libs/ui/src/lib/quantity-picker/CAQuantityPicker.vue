<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useField } from "vee-validate";
import * as zod from "zod";

import CAButton from "../button/CAButton.vue";
import CAInput from "../input/CAInput.vue";

const props = defineProps<{
  modelValue: number;
}>();

const { value, errorMessage, setValue } = useField(
  "quantity",
  toTypedSchema(zod.number("Invalid").min(1, { message: "Minimum is 1" })),
  {
    initialValue: props.modelValue,
    syncVModel: true,
  },
);

function onDecrease() {
  if (!value.value || value.value <= 1) {
    setValue(1);
  } else {
    setValue(value.value - 1);
  }
}

function onIncrease() {
  if (!value.value) {
    setValue(1);
  } else {
    setValue(value.value + 1);
  }
}
</script>

<template>
  <div>
    <div class="h-full flex items-stretch justify-center">
      <CAButton
        type="button"
        class="w-16 border-r-0!"
        @click="onDecrease()"
        >-</CAButton
      >

      <CAInput
        id="quantity"
        v-model="value"
        name="quantity"
        type="number"
        :min="1"
      />

      <CAButton
        type="button"
        class="w-16 border-l-0!"
        @click="onIncrease()"
        >+</CAButton
      >
    </div>

    <div class="error-text">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
:deep(input[type="number"]) {
  @apply text-center;
}

:deep(input[type="number"]::-webkit-inner-spin-button),
:deep(input[type="number"]::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
</style>
