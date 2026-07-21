import { LogEntry } from "@/lib/supabase/db/types";
import dayjs from "dayjs";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin typed wrapper around fetch for the internal /api routes.
 *
 * Non-2xx responses throw an ApiError so callers can't accidentally treat an
 * error payload as data. Functions are module-level and referentially stable —
 * safe to list in dependency arrays.
 */
async function api<T = unknown>(
  pathName: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(pathName, options);

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // Non-JSON error body — keep statusText
    }
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}

async function fetchLogs(
  exerciseIds: number[],
  dateRange?: { startFrom: dayjs.Dayjs; endOn: dayjs.Dayjs }
) {
  return api<LogEntry[]>(`/api/logs`, {
    method: "POST",
    body: JSON.stringify(
      dateRange
        ? { exerciseIds, startFrom: dateRange.startFrom, endOn: dateRange.endOn }
        : { exerciseIds }
    ),
  });
}

const client = {
  fetch: api,
  fetchLogs,
} as const;

export function useFetch() {
  return client;
}
