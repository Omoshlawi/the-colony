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

export const useAttributeType = (id: string) => {
  const path = `/attribute-types/${id}`;
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<AttributeType>>(path);
  return {
    attributeType: data?.data,
    isLoading,
    error,
    mutate,
  };
}

export default useAttributeTypes;
