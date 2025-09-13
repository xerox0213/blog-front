<script lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { type InputHTMLAttributes, reactive } from "vue";
import * as z from "zod";

type Field = {
  name: string;
  label: string;
  type: InputHTMLAttributes["type"];
};

type State = Record<Field["name"], any>;

type Props = {
  fields: Field[];
  schema: z.ZodObject;
  validate?: (state: Partial<State>) => FormError<string>[];
};

type Emits = {
  submit: [event: FormSubmitEvent<any>];
};
</script>

<script setup lang="ts">
defineProps<Props>();

const emit = defineEmits<Emits>();

const state = reactive<Partial<State>>({});

function onSubmit(event: FormSubmitEvent<State>) {
  emit("submit", event);
}
</script>

<template>
  <UCard class="mx-auto mt-20 max-w-[500px]">
    <div class="mb-5 space-y-2">
      <h1 class="text-center text-3xl font-bold">
        <slot name="title"></slot>
      </h1>

      <p class="text-dimmed text-center">
        <slot name="subtitle"></slot>
      </p>
    </div>

    <UForm
      :schema
      :state
      :validate
      :validate-on="['blur']"
      class="space-y-5"
      @submit="onSubmit"
    >
      <UFormField
        v-for="field in fields"
        :key="field.name"
        :label="field.label"
        :name="field.name"
      >
        <UInput v-model="state[field.name]" :type="field.type" class="w-full" />
      </UFormField>

      <div class="space-y-2">
        <UButton type="submit" block>
          <slot name="submitText"></slot>
        </UButton>

        <slot name="additionnal"></slot>
      </div>
    </UForm>
  </UCard>
</template>
