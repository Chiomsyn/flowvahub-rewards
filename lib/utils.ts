import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import type { ClassValue } from "clsx";

type ErrorWithMessage = {
  message: string;
};

type ZodError = {
  name: string;
  errors: Record<string, { message: string }>;
};

type PrismaError = {
  name: string;
  code: string;
  meta?: {
    target?: string[];
  };
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatError(error: unknown): string {
  // Handle Zod errors
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as ZodError).name === "ZodError"
  ) {
    const zodError = error as ZodError;
    const fieldErrors = Object.values(zodError.errors).map(
      (err) => err.message
    );
    return fieldErrors.join(". ");
  }

  // Handle Prisma errors
  if (typeof error === "object" && error !== null && "code" in error) {
    const prismaError = error as PrismaError;
    if (
      prismaError.name === "PrismaClientKnownRequestError" &&
      prismaError.code === "P2002"
    ) {
      const field = prismaError.meta?.target?.[0] || "field";
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
  }

  // Handle errors with message property
  if (isErrorWithMessage(error)) {
    return error.message;
  }

  // Handle other error types
  try {
    return typeof error === "string" ? error : JSON.stringify(error);
  } catch {
    return "An unknown error occurred";
  }
}
