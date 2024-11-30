import useSWR from "swr";

const useApi = <T>(resource: string, fetcher?: (url: string) => Promise<T>) => {
  const res = useSWR<T>(
    resource,
    fetcher ?? null
    // { fetcher }
  );
  res.data;
  return res;
};

export default useApi;
