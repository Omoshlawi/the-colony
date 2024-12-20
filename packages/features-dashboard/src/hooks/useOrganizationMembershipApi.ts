import { hiveFetch } from "@colony/core-api";
import {
  OrganizationMembership,
  OrganizationMembershipFormData,
} from "../types";

const addOrganizationMembership = async (
  data: OrganizationMembershipFormData
) => {
  return await hiveFetch<OrganizationMembership>("/organization-membership", {
    method: "POST",
    data,
  });
};

const updateOrganizationMembership = async (
  id: string,
  data: OrganizationMembershipFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<OrganizationMembership>(
    `/organization-membership/${id}`,
    {
      method: method,
      data,
    }
  );
};

const deleteOrganizationMembership = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<OrganizationMembership>(
    `/organization-membership/${id}`,
    {
      method: method,
    }
  );
};

export const useOrganizationMembershipApi = () => {
  return {
    addOrganizationMembership,
    updateOrganizationMembership,
    deleteOrganizationMembership,
  };
};
