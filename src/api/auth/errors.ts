import { isApiError } from "@/api";

export const toLoginErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    if (error.status === 400) return "Invalid username or password.";
    if (error.status === undefined)
      return "Network error. Is the mock API running?";
  }
  return "Something went wrong. Please try again.";
};
