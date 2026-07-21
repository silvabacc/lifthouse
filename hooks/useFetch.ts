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
 * Unlike raw fetch, non-2xx responses throw an ApiError so callers can't
 * accidentally treat an error payload as data.
 */
export function useFetch() {
  const api = async <T = unknown>(
    pathName: string,
    options?: RequestInit
  ): Promise<T> => {
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
  };

  const fetchLogs = async (
    exerciseIds: number[],
    dateRange?: { startFrom: dayjs.Dayjs; endOn: dayjs.Dayjs }
  ) => {
    return api<LogEntry[]>(`/api/logs`, {
      method: "POST",
      body: JSON.stringify(
        dateRange
          ? { exerciseIds, startFrom: dateRange.startFrom, endOn: dateRange.endOn }
          : { exerciseIds }
      ),
    });
  };

  return {
    fetch: api,
    fetchLogs,
  };
}
