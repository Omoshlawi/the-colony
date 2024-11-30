import { ExpoIcon } from "@colony/core-components";

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
