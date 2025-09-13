<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email address",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "password_confirmation",
    label: "Confirm password",
    type: "password",
  },
];

const schema = z.object({
  name: z.string("Name is requried"),
  email: z.string("Invalid email"),
  password: z.string("Password is required"),
  password_confirmation: z.string("Password confirmation is required"),
});

type Schema = z.output<typeof schema>;

const validate = (state: Partial<Schema>) => {
  const errors = [];

  if (
    state.password_confirmation &&
    state.password_confirmation != state.password
  ) {
    errors.push({
      name: "password_confirmation",
      message: "Passwords did not match",
    });
  }

  return errors;
};

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  console.log(event.data.name);
};
</script>

<template>
  <AuthForm :fields :schema :validate @submit="onSubmit">
    <template #title>
      <span>📚</span>
      <br />
      <span>Create an account</span>
    </template>

    <template #subtitle>
      Enter your information below to create your account
    </template>

    <template #submitText>Create account</template>

    <template #additionnal>
      <UButton to="/login" variant="link" block>
        Already have an account ? Log in
      </UButton>
    </template>
  </AuthForm>
</template>
