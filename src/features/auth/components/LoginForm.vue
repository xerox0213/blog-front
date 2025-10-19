<script lang="ts">
import * as z from "zod";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});

export type LoginCredentials = z.infer<typeof schema>;
</script>

<script setup lang="ts">
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { REQUEST_FAILURE_TOAST } from "@/shared/toasts";
import { ValidationError } from "@/shared/types/api/ValidationError";
import { extractFirstErrors } from "@/shared/utils/validation-errors";
import type { FormSubmitEvent } from "@nuxt/ui";
import { FetchError } from "ofetch";
import { login } from "../api";
import { useAuthForm } from "../composables/useAuthForm";

const toast = useToast();

const authStore = useAuthStore();

const { fields, setFieldErrors } = useAuthForm([
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
]);

const onSubmit = async (event: FormSubmitEvent<LoginCredentials>) => {
  try {
    authStore.user = await login(event.data);
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status === 422) {
        const validationError = e.data as ValidationError;
        const errors = extractFirstErrors(validationError.errors);
        setFieldErrors(errors);
      } else {
        toast.add(REQUEST_FAILURE_TOAST);
      }
    }
  }
};
</script>

<template>
  <UPageCard class="max-w-max mx-auto">
    <UAuthForm
      :schema
      :fields
      icon="i-lucide-user"
      title="Log in to your account"
      description="Enter your email and password below to log in"
      :submit="{ label: 'Log in', variant: 'soft', size: 'lg' }"
      @submit="onSubmit"
    >
      <template #footer>
        Don't have an account ?
        <ULink :to="{ name: '/register' }">Sign up</ULink>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
