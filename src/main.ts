import ui from "@nuxt/ui/vue-plugin";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import router from "./core/router";

const app = createApp(App);
const pinia = createPinia();

app.use(VueQueryPlugin);

app.use(router);

app.use(ui);

app.use(pinia);

app.mount("#app");
