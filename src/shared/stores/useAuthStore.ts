import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "../types/models/User";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();

  return {
    user,
  };
});
