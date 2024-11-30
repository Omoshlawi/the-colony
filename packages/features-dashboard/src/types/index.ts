import { ExpoIcon } from "@colony/core-components";
import { z } from "zod";
import {
  AmenitySchema,
  AttributeTypeSchema,
  CategorySchema,
  RelationshipTypeSchema,
} from "../utils/validation";

export type MenuItem = {
  name: string;
  icon: ExpoIcon;
  route: string;
};

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

export interface RelationshipType {
  id: string;
  description: any;
  aIsToB: string;
  bIsToA: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
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

export type AmenityFormData = z.infer<typeof AmenitySchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type RelationshipTypeFormData = z.infer<typeof RelationshipTypeSchema>;
export type AttributeTypeFormData = z.infer<typeof AttributeTypeSchema>;
