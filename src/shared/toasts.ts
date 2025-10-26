export const REQUEST_FAILURE_TOAST = {
  title: "Uh oh! Something went wrong.",
  description: "There was a problem with your request.",
  icon: "i-lucide-wifi",
  color: "error",
} as const;

export const UNAUTHENTICATED_TOAST = {
  title: "Session expired",
  description: "Your session expired. Please log in again.",
  icon: "i-lucide-circle-alert",
  color: "error",
} as const;
