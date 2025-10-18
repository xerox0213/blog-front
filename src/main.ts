import ui from "@nuxt/ui/vue-plugin";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import router from "./router";

const app = createApp(App);

app.use(VueQueryPlugin);

app.use(router);

app.use(ui);

app.mount("#app");
