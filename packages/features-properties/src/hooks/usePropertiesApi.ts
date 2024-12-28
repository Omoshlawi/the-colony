import { hiveFetch } from "@colony/core-api";
import { Property, PropertyFormData } from "../types";

const addProperty = async (data: PropertyFormData) => {
  return await hiveFetch<Property>("/properties", {
    method: "POST",
    data,
  });
};

const updateProperty = async (
  id: string,
  data: PropertyFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Property>(`/properties/${id}`, {
    method: method,
    data,
  });
};

const deleteProperty = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Property>(`/properties/${id}`, {
    method: method,
  });
};

const usePropertiesApi = () => {
  return {
    addProperty,
    updateProperty,
    deleteProperty,
  };
};

export default usePropertiesApi;
