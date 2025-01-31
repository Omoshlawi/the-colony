import { HiveFetchResponse, useApi } from "@colony/core-api";
import { RelationshipType } from "../types";

const useRelationshipTypes = () => {
  const path = "/relationship-types";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: RelationshipType[] }>>(path);
  return {
    relationshipTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useRelationshipTypes;
