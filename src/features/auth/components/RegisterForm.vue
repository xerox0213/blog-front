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
import type { AuthFormField } from "@nuxt/ui";
import { FormSubmitEvent } from "@nuxt/ui";
import { FetchError } from "ofetch";
import { ref } from "vue";
import { register } from "../api";

const toast = useToast();

const fields = ref<AuthFormField[]>([
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
        const errors: Record<string, string> = {};

        for (const [key, value] of Object.entries(validationError.errors)) {
          errors[key] = value[0];
        }

        setFieldErrors(errors);
      } else {
        toast.add(REQUEST_FAILURE_TOAST);
      }
    }
  }
};

const setFieldErrors = (errors: Record<string, string>) => {
  for (const field of fields.value) {
    if (field.name in errors) {
      field.error = errors[field.name];
    } else {
      field.error = undefined;
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
