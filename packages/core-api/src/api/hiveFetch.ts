import { HiveFetchInit, HiveFetchResponse } from "../types";
import httpClient from "./httpClient";

export const hiveFetch = async <T = any, K = any>(
  url: string,
  options?: HiveFetchInit
): Promise<HiveFetchResponse<T, K>> => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const headers = { ...defaultHeaders, ...options?.headers };

    return await httpClient({
      ...options,
      url,
      method: options?.method ?? "GET",
      headers,
    });
  } catch (error) {
    // Optionally log or process the error before rethrowing
    // TODO Properly handle error
    console.log("HiveFetch Error:", error);
    throw error; // Re-throw error to be handled by the caller
  }
};
