import { HiveFetchInit } from "../types";
import httpClient from "./httpClient";

export const hiveFetch = async (url: string, options?: HiveFetchInit) => {
  return await httpClient({
    ...options,
    url,
    method: options?.method ?? "GET",
  });
};
