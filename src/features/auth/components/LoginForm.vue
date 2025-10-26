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
import { GlobalError } from "@/shared/types/api/errors/GlobalError";
import { ValidationError } from "@/shared/types/api/errors/ValidationError";
import { extractFirstErrors } from "@/shared/utils/validation-errors";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { ref } from "vue";
import { login } from "../api";
import { useAuthForm } from "../composables/useAuthForm";

const authStore = useAuthStore();

const loginMutation = useMutation({
  mutationFn: login,
  onSuccess: (data) => {
    authStore.user = data;
  },
  onError: (error) => {
    if (error.status && error.data) {
      switch (error.status) {
        case 401: {
          const { message } = error.data as GlobalError;
          errorAlertTitle.value = message;
          break;
        }
        case 422: {
          const validationError = error.data as ValidationError;
          const errors = extractFirstErrors(validationError.errors);
          setFieldErrors(errors);
          break;
        }
      }
    }
  },
});

const errorAlertTitle = ref("");

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

const onSubmit = (event: FormSubmitEvent<LoginCredentials>) => {
  errorAlertTitle.value = "";
  loginMutation.mutate(event.data);
};
</script>

<template>
  <UAuthForm
    :loading="loginMutation.isPending.value"
    :schema
    :fields
    icon="i-lucide-user"
    title="Log in to your account"
    description="Enter your email and password below to log in"
    :submit="{ label: 'Log in', variant: 'soft', size: 'lg' }"
    @submit="onSubmit"
  >
    <template #validation>
      <UAlert
        v-if="errorAlertTitle"
        :title="errorAlertTitle"
        icon="i-lucide-info"
        variant="soft"
        color="error"
      />
    </template>

    <template #footer>
      Don't have an account ?
      <ULink :to="{ name: '/register' }">Sign up</ULink>
    </template>
  </UAuthForm>
</template>
