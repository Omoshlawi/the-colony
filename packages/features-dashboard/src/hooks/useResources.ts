import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Resource } from "../types";

const useResources = () => {
  const path = "/resources";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Resource[] }>>(path);
  return {
    resources: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useResources;
