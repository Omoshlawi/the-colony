import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { OrganizationMembership } from "../types";

export const useStaff = (filters: Record<string, any>) => {
  const path = constructUrl("/organization-membership", {
    v: "custom:include(organization,membershipRoles)",
    ...filters,
  });
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: OrganizationMembership[] }>>(path);
  return {
    staffs: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
