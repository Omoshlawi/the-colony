import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Role } from "../types";

const useRoles = () => {
  const path = "/roles";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Role[] }>>(path);
  return {
    resources: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useRoles;
