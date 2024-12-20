import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Amenity, AppService } from "../types";

const useAppServices = () => {
  const path = "/service-registry/services";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: AppService[] }>>(path);
  return {
    appServices: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAppServices;
