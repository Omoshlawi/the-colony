import { HiveFetchResponse, useApi } from "@colony/core-api";

const useAttributeTypes = () => {
  const path = "/attribute-types";
  const { data, error, isLoading, mutate } = useApi<HiveFetchResponse<{id:string}>>(path);
  return {
    attributeTypes: data
  }
};

export default useAttributeTypes;
