<script setup lang="ts">
import { useContact } from "@carolineaugier/api";

const { mutateAsync: sendMail } = useContact();

async function onSubmit() {
  try {
    await sendMail({
      name: "Name test",
      email: "test@example.com",
      body: "Body test",
    });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section>
    <div>Contact</div>

    <div>
      <input
        type="text"
        name="name"
      />

      <input
        type="email"
        name="email"
      />

      <textarea name="body" />

      <button
        type="submit"
        @click="onSubmit"
      >
        Submit
      </button>
    </div>
  </section>
</template>
