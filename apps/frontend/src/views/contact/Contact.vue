<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import { pagesQueries, useContact } from "@carolineaugier/api";
import { SHOPIFY_HANDLES } from "@carolineaugier/common";
import { CAButton, CAHtml, CAInput, CASkeleton } from "@carolineaugier/ui";

const { data: page, isLoading } = useQuery(
  pagesQueries.getPageByHandle(SHOPIFY_HANDLES.pages.contact),
);
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
  <div>
    <section
      v-if="isLoading"
      class="max-w-7xl mx-auto"
    >
      <CASkeleton class="w-full h-64" />
    </section>

    <template v-else>
      <div
        v-if="page"
        class="space-y-4"
      >
        <section class="max-w-7xl mx-auto">
          <h1 class="text-2xl uppercase font-semibold">
            {{ page.title }}
          </h1>
        </section>

        <!-- Image -->
        <div class="group flex items-center h-96 overflow-hidden">
          <img
            v-if="page.image?.reference?.image?.url"
            class="transition-transform duration-700 group-hover:scale-105"
            :src="page.image.reference.image.url"
            :alt="page.image.reference.image.altText ?? page.title"
            loading="lazy"
          />
        </div>

        <section class="max-w-7xl mx-auto">
          <div class="space-y-8">
            <CAHtml
              class="text-justify"
              :content="page.body"
            />

            <form
              action="#"
              class="max-w-xl mx-auto grid grid-cols-2 gap-4"
              @submit="onSubmit"
            >
              <!-- Name -->
              <CAInput
                type="text"
                name="name"
                placeholder="Name"
              />

              <!-- Phone -->
              <CAInput
                type="phone"
                name="phone"
                placeholder="Phone"
              />

              <!-- Email -->
              <CAInput
                class="col-span-2"
                type="email"
                name="email"
                placeholder="Email"
              />

              <!-- Comment -->
              <CAInput
                class="col-span-2"
                type="textarea"
                name="comment"
                placeholder="Comment"
              />

              <CAButton
                type="submit"
                class="col-span-2 h-16 text-xl uppercase"
                @click="onSubmit"
                >Send</CAButton
              >
            </form>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
