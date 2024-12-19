import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { Role } from "../types";

const useRoles = () => {
  const path = constructUrl("/roles", {
    v: "custom:include(privileges:include(privilege))",
  });
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Role[] }>>(path);
  return {
    roles: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useRoles;
