import { HiveFetchResponse, useApi } from "@colony/core-api";
import { AttributeType } from "../types";

const useAttributeTypes = () => {
  const path = "/attribute-types";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: AttributeType[] }>>(path);
  return {
    attributeTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAttributeTypes;
