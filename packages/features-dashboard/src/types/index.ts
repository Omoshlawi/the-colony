import { ExpoIcon } from "@colony/core-components";
import { z } from "zod";
import {
  AddressSchema,
  AmenitySchema,
  AttributeTypeSchema,
  CategorySchema,
  OrganizationMembershipSchema,
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

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  memberUserId: string;
  memberUser: MemberUser;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  organization: Organization;
  membershipRoles: Array<MembershipRole>;
}

export interface MembershipRole {
  id: string;
  membershipId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  role: Role;
}

export type MemberUser = {
  id: string;
  username: string;
  person: {
    id: string;
    firstName: any;
    lastName: any;
    surname: any;
    phoneNumber: string;
    gender: string;
    email: string;
    name: any;
  };
};

export interface User {
  id: string;
  username: string;
  profileUpdated: boolean;
  accountVerified: any;
  voided: boolean;
  isAdmin: boolean;
  password: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  person: Person;
}

export interface Person {
  id: string;
  firstName?: string;
  lastName?: string;
  surname?: string;
  userId: string;
  avatarUrl?: string;
  phoneNumber: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  name?: string;
}

export interface AppService {
  name: string;
  version: string;
  port: number;
  host: string;
  timestamp: number;
  instance: string;
}

export interface ServiceResourcesSchemas {
  schemas: Schemas;
}

export interface Schemas {
  [resource: string]: ResourceSchema;
}

export interface ResourceSchema {
  columnNames: string[];
  orderedColumns: OrderedColumn[];
}

export interface OrderedColumn {
  name: string;
  position: number;
  type: string;
  nullable: boolean;
}

export interface Address {
  id: string;
  name: string;
  description: string;
  country: string;
  county: string;
  subCounty: string;
  ward: string;
  village: any;
  landmark: string;
  postalCode: any;
  latitude: any;
  longitude: any;
  ownerUserId: string;
  ownerUser: any;
  organizationId: any;
  organization: any;
  metadata: any;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface County {
  code: string;
  name: string;
  capital: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  subCounties: SubCounty[];
}

export interface SubCounty {
  code: string;
  name: string;
  countyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  name: string;
  countyCode: string;
  subCountyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AmenityFormData = z.infer<typeof AmenitySchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type RelationshipTypeFormData = z.infer<typeof RelationshipTypeSchema>;
export type AttributeTypeFormData = z.infer<typeof AttributeTypeSchema>;
export type PrivilegeFormData = z.infer<typeof PrivilegeSchema>;
export type RoleFormData = z.infer<typeof RoleSchema>;
export type RolePrivilegeFormData = z.infer<typeof RolePrivilegeSchema>;
export type ResourceFormData = z.infer<typeof ResourceSchema>;
export type OrganizationMembershipFormData = z.infer<
  typeof OrganizationMembershipSchema
>;
export type AddressFormData = z.infer<typeof AddressSchema>;
export type UserFormData = {};
