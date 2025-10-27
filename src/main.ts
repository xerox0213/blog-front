import ui from "@nuxt/ui/vue-plugin";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import { api } from "./core/api";
import router from "./core/router";
import { useAuthStore } from "./shared/stores/useAuthStore";
import { User } from "./shared/types/models/User";

const app = createApp(App);
const pinia = createPinia();

app.use(VueQueryPlugin);

app.use(router);

app.use(ui);

app.use(pinia);

api<User>("/api/user")
  .then((user) => (useAuthStore().user = user))
  .finally(() => app.mount("#app"));
