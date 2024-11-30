import { hiveFetch } from "@colony/core-api";
import { Amenity, AmenityFormData } from "../types";

const addAmenity = async (data: AmenityFormData) => {
  return await hiveFetch<Amenity>("/amenities", { method: "POST", data });
};

const updateAmenity = async (
  amenityId: string,
  data: AmenityFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await hiveFetch<Amenity>(`/amenities/${amenityId}`, {
    method: method,
    data,
  });
};

const deleteAmenity = async (
  amenityId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await hiveFetch<Amenity>(`/amenities/${amenityId}`, {
    method: method,
  });
};

export const useAmenitiesApi = () => {
  return {
    addAmenity,
    updateAmenity,
    deleteAmenity,
  };
};
