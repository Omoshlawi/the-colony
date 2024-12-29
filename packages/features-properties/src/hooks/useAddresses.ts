import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { Address } from "../types";

export const useAddresses = (filters: Record<string, any>) => {
  const path = constructUrl("/addresses", filters);
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Address[] }>>(path);
  return {
    addresses: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
