import { getCookieValue } from "@/shared/utils/cookies";
import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: "application/json" },
  credentials: "include",
  onRequest: ({ options }) => {
    const xsrfToken = decodeURIComponent(getCookieValue("XSRF-TOKEN"));
    options.headers.append("X-XSRF-TOKEN", xsrfToken);
  },
});
