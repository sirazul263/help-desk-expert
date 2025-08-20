import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get current time in user's local timezone
 * @returns string like "Asia/Dhaka (2:09AM)"
 */
export function getCurrentTimeWithZone(): string {
  // Detect user's timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get current date
  const now = new Date();

  // Convert to user's timezone
  const zonedTime = toZonedTime(now, timeZone);

  // Format time
  const formattedTime = format(zonedTime, "h:mmaaa"); // 2:09AM

  return `${timeZone} (${formattedTime})`;
}

export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const getErrorMessage = (err: unknown): string => {
  // First, check if `err` is an object and not null
  if (typeof err === "object" && err !== null) {
    // Now, narrow the type of `err` by checking for the `errors` property
    if ("errors" in err) {
      const errors = (err as { errors?: Record<string, string[]> }).errors;
      if (errors) {
        return Object.values(errors)[0][0] || "An unknown error occurred";
      }
    }

    // Check if `err` has a `message` property
    if ("message" in err) {
      const message = (err as { message?: string | Record<string, string[]> })
        .message;

      if (typeof message === "object" && message !== null) {
        return Object.values(message)[0][0] || "An unknown error occurred";
      }

      if (typeof message === "string") {
        return message;
      }
    }
  }
  // If `err` doesn't have the expected structure, return a default message
  return "An unknown error occurred";
};
