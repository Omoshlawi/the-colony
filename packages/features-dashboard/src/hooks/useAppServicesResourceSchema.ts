import { hiveFetch, HiveFetchResponse, useApi } from "@colony/core-api";
import { ServiceResourcesSchemas } from "../types";

export const useAppServicesResourceSchema = (serviceName: string) => {
  const fetcher = async (url: string) => {
    return await hiveFetch<ServiceResourcesSchemas>(url, {
      method: "POST",
      data: { name: serviceName },
    });
  };

  const path = "/resources-schema";
  const { data, error, isLoading, mutate } = useApi<
    HiveFetchResponse<ServiceResourcesSchemas>
  >(path, fetcher);
  return {
    amenities: data?.data ?? {},
    isLoading,
    error,
    mutate,
  };
};

const sourceServiceResourcesSchema = async (serviceName: string) => {
  return await hiveFetch<ServiceResourcesSchemas>("/resources-schema/source", {
    method: "POST",
    data: { name: serviceName },
  });
};

export const useAppServicesResourceSchemaApi = async () => {
  return { sourceServiceResourcesSchema };
};
