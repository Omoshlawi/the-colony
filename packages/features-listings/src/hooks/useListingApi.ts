import { constructUrl, hiveFetch } from "@colony/core-api";
import { Listing, ListingFormData } from "../types";
import { Property } from "@colony/features-properties";

const addListing = async (data: ListingFormData) => {
  return await hiveFetch<Listing>("/listings", { method: "POST", data });
};

const updateListing = async (
  listingId: string,
  data: ListingFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Listing>(`/listings/${listingId}`, {
    method: method,
    data,
  });
};

const deleteListing = async (
  listingId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Listing>(`/listings/${listingId}`, {
    method: method,
  });
};

const searchProperty = (filters: Record<string, any>) => {
  const url = constructUrl(`/properties`, filters);
  return hiveFetch<{ results: Array<Property> }>(url);
};

export const useListingApi = () => {
  return {
    addListing,
    updateListing,
    deleteListing,
    searchProperty,
  };
};
