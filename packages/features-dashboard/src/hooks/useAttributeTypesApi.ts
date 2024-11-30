import { hiveFetch } from "@colony/core-api";
import { AttributeType, AttributeTypeFormData } from "../types";

const addAttributeType = async (data: AttributeTypeFormData) => {
  return await hiveFetch<AttributeType>("/attribute-types", {
    method: "POST",
    data,
  });
};

const updateAttributeType = async (
  id: string,
  data: AttributeTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<AttributeType>(`/attribute-types/${id}`, {
    method: method,
    data,
  });
};

const deleteAttributeType = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<AttributeType>(`/attribute-types/${id}`, {
    method: method,
  });
};

export const useAttributeTypeApi = () => {
  return {
    addAttributeType,
    updateAttributeType,
    deleteAttributeType,
  };
};
