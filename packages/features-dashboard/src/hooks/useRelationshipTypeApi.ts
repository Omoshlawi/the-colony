import { hiveFetch } from "@colony/core-api";
import { RelationshipType, RelationshipTypeFormData } from "../types";

const addRelationshipType = async (data: RelationshipTypeFormData) => {
  return await hiveFetch<RelationshipType>("/relationship-types", {
    method: "POST",
    data,
  });
};

const updateRelationshipType = async (
  id: string,
  data: RelationshipTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: method,
    data,
  });
};

const deleteRelationshipType = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: method,
  });
};

export const useRelationshipTypeApi = () => {
  return {
    addRelationshipType,
    updateRelationshipType,
    deleteRelationshipType,
  };
};
