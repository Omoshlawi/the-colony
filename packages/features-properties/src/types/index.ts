import { PropertyMediaSchema, PropertySchema } from "../utils";
import z from "zod";
export interface Property {
  id: string;
  name: string;
  thumbnail: string;
  organizationId: string;
  organization: Organization;
  addressId: string;
  address: Address;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Address {
  id: string;
  name: string;
  ward: string;
  county: string;
  village: any;
  landmark: string;
  latitude: any;
  metadata: any;
  longitude: any;
  subCounty: string;
  postalCode: string;
  description: string;
}

export type PropertyFormData = z.infer<typeof PropertySchema>;
export type PropertyMediaFormData = z.infer<typeof PropertyMediaSchema>;
