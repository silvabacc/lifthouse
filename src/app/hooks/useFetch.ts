import getConfig from "@/config";
import { LogEntry } from "@/lib/supabase/db/types";
import dayjs from "dayjs";

const { baseUrl } = getConfig();

export function useFetch() {
  const api = async (pathName: string, options?: RequestInit) => {
    const response = await fetch(`${baseUrl}${pathName}`, options);
    return response.json();
  };

  const fetchLogs = async (
    exerciseIds: number[],
    dateRange?: { startFrom: dayjs.Dayjs; endOn: dayjs.Dayjs }
  ) => {
    if (dateRange) {
      const { startFrom, endOn } = dateRange;
      const response: LogEntry[] = await api(`/api/logs`, {
        method: "POST",
        body: JSON.stringify({
          exerciseIds,
          startFrom,
          endOn,
        }),
      });
      return response;
    }

    const response: LogEntry[] = await api(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({ exerciseIds }),
    });
    return response;
  };

  return {
    fetch: api,
    fetchLogs,
  };
}
