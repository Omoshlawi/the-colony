import { ExpoIcon } from "@colony/core-components";
import { z } from "zod";
import {
  AmenitySchema,
  AttributeTypeSchema,
  CategorySchema,
  PrivilegeSchema,
  RelationshipTypeSchema,
  ResourceSchema,
  RolePrivilegeSchema,
  RoleSchema,
} from "../utils/validation";

export type MenuItem = {
  name: string;
  icon: ExpoIcon;
  route: string;
  color?: string;
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

export interface Resource {
  id: string;
  name: string;
  description: string;
  dataPoints: string[];
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export type Operation = "Create" | "Read" | "Update" | "Delete";
export interface Privilege {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  organizationId: string;
  resourceId: string;
  permitedResourceDataPoints: string[];
  operations: Operation[];
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  resource?: Resource;
  organization?: Organization;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export interface RolePrivilege {
  id: string;
  privilegeId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  privilege: Privilege;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  organizationId?: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  organization?: Organization;
  privileges?: Array<RolePrivilege>;
}

export type AmenityFormData = z.infer<typeof AmenitySchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type RelationshipTypeFormData = z.infer<typeof RelationshipTypeSchema>;
export type AttributeTypeFormData = z.infer<typeof AttributeTypeSchema>;
export type PrivilegeFormData = z.infer<typeof PrivilegeSchema>;
export type RoleFormData = z.infer<typeof RoleSchema>;
export type RolePrivilegeFormData = z.infer<typeof RolePrivilegeSchema>;
export type ResourceFormData = z.infer<typeof ResourceSchema>;
