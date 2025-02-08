import { constructUrl, HiveFetchResponse, useApi } from "@colony/core-api";
import React from "react";
import { Listing } from "../types";

const useListings = () => {
  const url = constructUrl("/listings");
  const { data, error, isLoading, mutate } =
    useApi<HiveFetchResponse<{ results: Array<Listing> }>>(url);
  return {
    listings: data?.data?.results ?? [],
    isLoading,
    error,
    mutate
  };
};

export default useListings;
