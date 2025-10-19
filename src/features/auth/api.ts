import { api } from "@/core/api";
import { RegistrationCredentials } from "./components/RegisterForm.vue";
import { RegisterResponse } from "./types";

export const getCsrfCookie = async () => {
  return api("/sanctum/csrf-cookie");
};

export const register = async (credentials: RegistrationCredentials) => {
  await getCsrfCookie();
  return api<RegisterResponse>("/api/register", {
    method: "POST",
    body: credentials,
  });
};
