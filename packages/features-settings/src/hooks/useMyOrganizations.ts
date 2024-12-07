import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { useSession } from "@colony/core-global";
import { OrganizationMembership } from "../types";

const useMyOrganizations = () => {
  const customRep = "custom:include(organization,membershipRoles)";
  const { user } = useSession();
  const path = constructUrl("/organization-membership", {
    v: customRep,
    memberUserId: user?.id,
  });
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
