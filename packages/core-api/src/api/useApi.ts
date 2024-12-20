import useSWR, { SWRConfiguration } from "swr";

const useApi = <T>(
  resource: string,
  fetcher?: (url: string) => Promise<T>,
  options?: SWRConfiguration
) => {
  const res = useSWR<T>(resource, fetcher ?? null, options);
  res.data;
  return res;
};

export default useApi;
