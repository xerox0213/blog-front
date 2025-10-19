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
import { REQUEST_FAILURE_TOAST } from "@/shared/toasts";
import { ValidationError } from "@/shared/types/api/ValidationError";
import { extractFirstErrors } from "@/shared/utils/validation-errors";
import { FormSubmitEvent } from "@nuxt/ui";
import { FetchError } from "ofetch";
import { register } from "../api";
import { useAuthForm } from "../composables/useAuthForm";

const toast = useToast();

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

const onSubmit = async (event: FormSubmitEvent<RegistrationCredentials>) => {
  try {
    await register(event.data);
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status == 422) {
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
      title="Create an account"
      description="Enter your information below to create your account"
      :submit="{ label: 'Create an account', variant: 'soft', size: 'lg' }"
      @submit="onSubmit"
    >
      <template #footer>
        Already have an account ?
        <ULink>Log in</ULink>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
