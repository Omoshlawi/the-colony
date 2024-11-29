import useSWR from "swr";

const useApi = <T>(
  resource: string,
  fetcher?: <T>(url: string) => Promise<T>
) => {
  const res = useSWR<T>(resource, { fetcher });
  return res;
};

export default useApi;
