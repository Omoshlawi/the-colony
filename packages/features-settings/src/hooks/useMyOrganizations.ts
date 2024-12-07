import { HiveFetchResponse, useApi } from "@colony/core-api";
import React from "react";
import { OrganizationMembership } from "../types";

const useMyOrganizations = () => {
  const customRep = "custom:include(organization,membershipRoles)";
  const path = `/organization-membership?v=${customRep}`;
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: OrganizationMembership[] }>>(path);
  return {
    organizationsMemberships: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useMyOrganizations;
