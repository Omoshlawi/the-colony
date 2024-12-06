import { ReactNode } from "react";

export type User = {};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export type Session = {
  isAuthenticated: boolean;
  user?: User;
  token?: TokenPair;
  currentOrganization?: string;
};

export type ThemeName = "dark" | "light" | "system";

export type UserPreference = {
  theme: ThemeName;
};

export type Appconfig = {};

export type ModalOverlay = {
  visible: boolean; // Modal visibility
  component?: ReactNode;
  transparent: boolean;
  dismissable: boolean;
};

export type SnackBarOverlay = {
  id: string;
  component?: ReactNode;
};
