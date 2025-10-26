import { REQUEST_FAILURE_TOAST, UNAUTHENTICATED_TOAST } from "@/shared/toasts";
import { getCookieValue } from "@/shared/utils/cookies";
import { ofetch } from "ofetch";
import router from "./router";

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: "application/json" },
  credentials: "include",
  onRequest: ({ options }) => {
    const xsrfToken = decodeURIComponent(getCookieValue("XSRF-TOKEN"));
    options.headers.append("X-XSRF-TOKEN", xsrfToken);
  },
  onRequestError: () => {
    const toast = useToast();
    toast.add(REQUEST_FAILURE_TOAST);
  },
  onResponseError: ({ response }) => {
    const route = router.currentRoute.value;

    if (
      (response.status === 401 || response.status === 419) &&
      route.name !== "/login" &&
      route.name !== "/register"
    ) {
      const toast = useToast();
      router.push("/login");
      toast.add(UNAUTHENTICATED_TOAST);
    }
  },
});
