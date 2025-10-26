import { GlobalError } from "./GlobalError";

export interface ValidationError extends GlobalError {
  errors: Record<string, string[]>;
}
