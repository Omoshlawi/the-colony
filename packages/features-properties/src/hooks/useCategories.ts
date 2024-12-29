import { HiveFetchResponse, useApi } from "@colony/core-api";
import { Category } from "../types";

const useCategories = () => {
  const path = "/categories";
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Category[] }>>(path);
  return {
    categories: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useCategories;
