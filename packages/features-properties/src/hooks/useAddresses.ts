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


export const useAddress = (id: string) => {
  const path = `/addresses/${id}`;
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<Address>>(path);
  return {
    address: data?.data,
    isLoading,
    error,
    mutate,
  };
}