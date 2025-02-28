import { ApolloError } from "@apollo/client";
import { ZodError } from "zod";

export function handleError(error: unknown): string {
  if (error instanceof ApolloError) {
    return error.graphQLErrors.length > 0
      ? error.graphQLErrors.map((err) => err.message).join(", ")
      : error.message || "An unexpected error occurred while communicating with the server.";
  }

  if (error instanceof ZodError) {
    return "Validation error: " + error.errors.map((err) => err.message).join(", ");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}
