import { constructUrl, hiveFetch } from "@colony/core-api";
import {
  Property,
  PropertyFormData,
  PropertyMedia,
  PropertyMediaFormData,
} from "../types";

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

const addPropertyMedia = (propertyId: string, data: PropertyMediaFormData) =>
  hiveFetch<PropertyMedia>(`properties/${propertyId}/media`, {
    method: "POST",
    data,
  });

const updatePropertyMedia = (
  propertyId: string,
  mediaId: string,
  data: PropertyMediaFormData,
  method: "PUT" | "PATCH" = "PATCH"
) =>
  hiveFetch<PropertyMedia>(`properties/${propertyId}/media/${mediaId}`, {
    method,
    data,
  });

const deletePropertyMedia = (
  propertyId: string,
  mediaId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => hiveFetch(`properties/${propertyId}/media/${mediaId}`, { method });

const searchProperty = (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  return hiveFetch<{ results: Array<Property> }>(url);
};

const usePropertiesApi = () => {
  return {
    addProperty,
    updateProperty,
    deleteProperty,
    addPropertyMedia,
    updatePropertyMedia,
    deletePropertyMedia,
    searchProperty,
  };
};

export default usePropertiesApi;
