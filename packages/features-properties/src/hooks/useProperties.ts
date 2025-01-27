import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { Property } from "../types";

const useProperties = () => {
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

export default useProperties;
