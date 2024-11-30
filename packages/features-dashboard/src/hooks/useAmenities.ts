import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Amenity } from "../types";

const useAmenities = () => {
  const path = "/amenities";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Amenity[] }>>(path);
  return {
    amenities: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAmenities;
