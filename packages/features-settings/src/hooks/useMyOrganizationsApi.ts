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

const swichOrganization = async (organizationid: string) => {
  const res = await hiveFetch<TokenPair>(`/change-context/${organizationid}`);
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
  return token;
};

const exitContext = async () => {
  const res = await hiveFetch<TokenPair>(`/exit-context`, { method: "DELETE" });
  const token = res.data;
  // Cash token
  const sessionStore = useSessionStore.getState();
  const decoded = sessionStore.decodeSesionToken?.(token);
  // update session token nd its cache
  sessionStore.setSessionToken(token, () =>
    sessionStore.cacheSession?.({ token })
  );
  // REMOVE organization id in session
  sessionStore.setSession({
    ...sessionStore.session,
    currentOrganization: undefined,
  });
  return token;
};
export const useMyOrganizationApi = () => {
  return {
    addMyOrganization,
    updateMyOrganization,
    deleteMyOrganization,
    swichOrganization,
    exitContext,
  };
};
