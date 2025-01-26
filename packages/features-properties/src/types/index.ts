import { PropertyMediaSchema, PropertySchema } from "../utils";
import z from "zod";
export interface Property {
  id: string;
  name: string;
  description?: string;
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
  village?: string;
  landmark: string;
  latitude?: string;
  metadata?: Record<string, any>;
  longitude?: string;
  subCounty: string;
  postalCode: string;
  description: string;
}

export interface Amenity {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AttributeType {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Icon {
  name: string;
  family: string;
}

export interface Category {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export type PropertyFormData = z.infer<typeof PropertySchema>;
export type PropertyMediaFormData = z.infer<typeof PropertyMediaSchema>;
