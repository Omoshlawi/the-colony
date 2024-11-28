import axios, { AxiosRequestConfig } from "axios";

type HiveFetchInit = Omit<AxiosRequestConfig, "url">;
type HiveFetchResponse = axios.AxiosResponse;

export const hiveFetch = async (url: string, options?: HiveFetchInit) => {
  return await axios({
    ...options,
    url,
    method: options?.method ?? "GET",
  });
};
