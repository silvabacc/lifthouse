import getConfig from "@/config";

const { baseUrl } = getConfig();

export function useFetch() {
  const api = async (pathName: string, options?: RequestInit) => {
    const response = await fetch(`${baseUrl}${pathName}`, options);
    return response.json();
  };

  return {
    fetch: api,
  };
}
