import { FetchError } from "ofetch";

declare module "@tanstack/vue-query" {
  interface Register {
    defaultError: FetchError<unknown>;
  }
}
