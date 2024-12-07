import { hiveFetch } from "@colony/core-api";
import { Organization, OrganizationFormData } from "../types";
import { TokenPair, useSessionStore } from "@colony/core-global";

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

const swichOrganization = async <T>(organizationid: string) => {
  return await hiveFetch<T>(`/change-context/${organizationid}`);
};

export const useMyOrganizationApi = () => {
  return {
    addMyOrganization,
    updateMyOrganization,
    deleteMyOrganization,
    swichOrganization: async (organizationid: string) => {
      const res = await swichOrganization<TokenPair>(organizationid);
      const token = res.data;
      // Cash token
      const sessionStore = useSessionStore.getState();
      const decoded = sessionStore.decodeSesionToken?.(token);
      // update session token nd its cache
      sessionStore.setSessionToken(token, () =>
        sessionStore.cacheSession?.({ token })
      );
      // Update organization id in session
      if (decoded?.organizationId) {
        sessionStore.setSessionOrganization(decoded!.organizationId);
      }
    },
  };
};
