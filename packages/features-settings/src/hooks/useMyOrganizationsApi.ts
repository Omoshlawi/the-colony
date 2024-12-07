import { hiveFetch } from "@colony/core-api";
import { Organization, OrganizationFormData } from "../types";

const addMyOrganization = async (data: OrganizationFormData) => {
  return await hiveFetch<Organization>("/organizations", {
    method: "POST",
    data,
  });
};

const updateMyOrganization = async (
  id: string,
  data: OrganizationFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Organization>(`/organizations/${id}`, {
    method: method,
    data,
  });
};

const deleteMyOrganization = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Organization>(`/organizations/${id}`, {
    method: method,
  });
};

export const useMyOrganizationApi = () => {
  return {
    addMyOrganization,
    updateMyOrganization,
    deleteMyOrganization,
  };
};
