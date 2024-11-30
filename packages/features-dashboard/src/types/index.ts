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
