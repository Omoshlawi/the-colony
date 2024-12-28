import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Property } from "../types";

const useProperties = () => {
  const path = "/properties";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Property[] }>>(path);
  return {
    properties: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useProperties;
