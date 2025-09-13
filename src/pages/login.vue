<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const fields = [
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
];

const schema = z.object({
  email: z.string("Invalid email"),
  password: z.string("Password is required"),
});

type Schema = z.output<typeof schema>;

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
};
</script>

<template>
  <AuthForm :fields :schema @submit="onSubmit">
    <template #title>
      <span>📚</span>
      <br />
      <span>Log in account</span>
    </template>

    <template #subtitle>
      Enter your email and password below to log in
    </template>

    <template #submitText>Log in</template>

    <template #additionnal>
      <UButton to="/register" variant="link" block>
        Don't have an account ? Sign up
      </UButton>
    </template>
  </AuthForm>
</template>
