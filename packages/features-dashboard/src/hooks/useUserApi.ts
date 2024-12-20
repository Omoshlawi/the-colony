import { constructUrl, hiveFetch } from "@colony/core-api";
import { User, UserFormData } from "../types";

const addUser = async (data: UserFormData) => {
  return await hiveFetch<User>("/users", { method: "POST", data });
};

const updateUser = async (
  id: string,
  data: UserFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<User>(`/users/${id}`, {
    method: method,
    data,
  });
};

const deleteUser = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<User>(`/users/${id}`, {
    method: method,
  });
};

const searchUser = async (search: string) => {
  const url = constructUrl("/users", {
    search,
  });
  return await hiveFetch<{ results: Array<User> }>(url);
};

export const useUserApi = () => {
  return {
    // addUser,
    // updateUser,
    // deleteUser,
    searchUser,
  };
};
