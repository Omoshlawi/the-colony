import { hiveFetch } from "@colony/core-api";
import { Privilege, PrivilegeFormData } from "../types";

const addPrivilege = async (data: PrivilegeFormData) => {
  return await hiveFetch<Privilege>("/privileges", { method: "POST", data });
};

const updatePrivilege = async (
  id: string,
  data: PrivilegeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Privilege>(`/privileges/${id}`, {
    method: method,
    data,
  });
};

const deletePrivilege = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Privilege>(`/privileges/${id}`, {
    method: method,
  });
};

const usePrivilegeApi = () => {
  return {
    addPrivilege,
    updatePrivilege,
    deletePrivilege,
  };
};

export default usePrivilegeApi;
