import { hiveFetch } from "@colony/core-api";
import { Role, RoleFormData } from "../types";

const addRole = async (data: RoleFormData) => {
  return await hiveFetch<Role>("/roles", { method: "POST", data });
};

const updateRole = async (
  id: string,
  data: RoleFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Role>(`/roles/${id}`, {
    method: method,
    data,
  });
};

const deleteRole = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Role>(`/roles/${id}`, {
    method: method,
  });
};
const useRoleApi = () => {
  return {
    addRole,
    updateRole,
    deleteRole,
  };
};

export default useRoleApi;
