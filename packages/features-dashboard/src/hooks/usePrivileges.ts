import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Privilege } from "../types";

const usePrivileges = () => {
  const path = "/privileges";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Privilege[] }>>(path);
  return {
    privileges: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default usePrivileges;
