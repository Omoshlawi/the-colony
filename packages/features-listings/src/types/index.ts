import { z } from "zod";
import { ListingSchema } from "../utils";
import { Property } from "@colony/features-properties";

export interface Listing {
  id: string;
  propertyId: string;
  property: Property;
  organizationId: string;
  organization: Organization;
  tags: any[];
  status: string;
  title: string;
  description: any;
  price: string;
  currency: string;
  listedDate: string;
  expiryDate: any;
  featured: boolean;
  contactPersonId: string;
  contactPerson: any;
  metadata: Metadata;
  views: number;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  saleDetails?: SaleDetails;
}

export interface Address {
  id: string;
  name: string;
  ward: string;
  county: string;
  village?: string;
  landmark: string;
  latitude?: string;
  metadata?: string;
  longitude?: string;
  subCounty: string;
  postalCode: string;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Metadata {
  amenities: string[];
  attributes: Attributes;
  categories: string[];
}

export interface Attributes {
  [attribiteNameOrId: string]: string;
}

export interface SaleDetails {
  id: string;
  listingId: string;
  downPayment?: string;
  mortgageAvailable: boolean;
  priceNegotiable: boolean;
  titleDeedReady: boolean;
  financingOptions: string[];
  createdAt: string;
  updatedAt: string;
}

export type ListingFormData = z.infer<typeof ListingSchema>;
