import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { Property, PropertyMedia } from "../types";

const useProperties = (params?:Record<string, any>) => {
  const path = "/properties";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Property[] }>>(path);
  return {
    properties: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useProperty = (id: string) => {
  const path = constructUrl(`/properties/${id}`, {
    v: "custom:include(categories:include(category),amenities:include(amenity),attributes:include(attribute))",
  });

  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<Property>>(path);
  return {
    property: data?.data,
    isLoading,
    error,
    mutate,
  };
};

export const usePropertyMedia = (propertyId: string) => {
  const path = constructUrl(`/properties/${propertyId}/media`, {});

  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: PropertyMedia[] }>>(path);
  return {
    propertyMedia: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useProperties;
