import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import { Relationship } from "../types";

const useRelationships = (filters?: Record<string, any>) => {
  const url = constructUrl("/relationships", filters ?? {});
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Array<Relationship> }>>(url);

  return {
    isLoading,
    error,
    mutate,
    relationsShips: data?.data?.results ?? [],
  };
};

export default useRelationships;
