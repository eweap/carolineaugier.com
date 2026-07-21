import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

import App from "./app/App.vue";
import { router } from "./router";
import "./styles.css";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(createPinia());

app.mount("#root");
