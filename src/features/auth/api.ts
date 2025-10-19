import { api } from "@/core/api";
import { LoginCredentials } from "./components/LoginForm.vue";
import { RegistrationCredentials } from "./components/RegisterForm.vue";
import { LoginResponse, RegisterResponse } from "./types";

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

export const login = async (credentials: LoginCredentials) => {
  await getCsrfCookie();
  return api<LoginResponse>("/api/login", {
    method: "POST",
    body: credentials,
  });
};
