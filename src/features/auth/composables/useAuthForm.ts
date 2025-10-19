import { AuthFormField } from "@nuxt/ui";
import { ref } from "vue";

export const useAuthForm = (value: AuthFormField[]) => {
  const fields = ref<AuthFormField[]>(value);

  const setFieldErrors = (errors: Record<string, string>) => {
    for (const field of fields.value) {
      if (field.name in errors) {
        field.error = errors[field.name];
      } else {
        field.error = undefined;
      }
    }
  };

  return {
    fields,
    setFieldErrors,
  };
};
