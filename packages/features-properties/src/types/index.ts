import { PropertyMediaSchema, PropertySchema } from "../utils";
import z from "zod";
export interface Property {
  id: string;
  name: string;
  description: any;
  thumbnail: string;
  organizationId: string;
  organization?: Organization;
  addressId: string;
  address?: Address;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  categories?: PropertyCategory[];
  amenities?: PropertyAmenity[];
  attributes?: Attribute[];
}

export interface PropertyMedia {
  id: string;
  propertyId: string;
  type: string;
  url: string;
  title: any;
  description: string;
  metadata: Metadata;
  order: number;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  size: number;
  memeType: string;
}

export interface PropertyAmenity {
  id: string;
  propertyId: string;
  amenityId: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  amenity?: Amenity;
}

export interface PropertyCategory {
  id: string;
  propertyId: string;
  categoryId: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface Attribute {
  id: string;
  propertyId: string;
  attributeId: string;
  value: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  attribute?: AttributeType;
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
