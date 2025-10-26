<script lang="ts">
import * as z from "zod";

const schema = z
  .object({
    name: z.string("Name is required."),
    email: z.email("Invalid email."),
    password: z.string("Password is required."),
    password_confirmation: z.string("Password confirmation is required."),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    { path: ["password"], error: "Passwords do not match" },
  );

export type RegistrationCredentials = z.output<typeof schema>;
</script>

<script setup lang="ts">
import { ValidationError } from "@/shared/types/api/errors/ValidationError";
import { extractFirstErrors } from "@/shared/utils/validation-errors";
import { FormSubmitEvent } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { ref } from "vue";
import { register } from "../api";
import { useAuthForm } from "../composables/useAuthForm";

const registerMutation = useMutation({
  mutationFn: register,
  onError: (error) => {
    if (error.status && error.data) {
      switch (error.status) {
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
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
  },
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
  {
    name: "password_confirmation",
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
  },
]);

const onSubmit = (event: FormSubmitEvent<RegistrationCredentials>) => {
  errorAlertTitle.value = "";
  registerMutation.mutate(event.data);
};
</script>

<template>
  <UAuthForm
    :loading="registerMutation.isPending.value"
    :schema
    :fields
    icon="i-lucide-user"
    title="Create an account"
    description="Enter your information below to create your account"
    :submit="{ label: 'Create an account', variant: 'soft', size: 'lg' }"
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
      Already have an account ?
      <ULink :to="{ name: '/login' }">Log in</ULink>
    </template>
  </UAuthForm>
</template>
