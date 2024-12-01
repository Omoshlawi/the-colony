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
};

export type ThemeName = "dark" | "light" | "system";

export type UserPreference = {
  theme: ThemeName;
};

export type Appconfig = {};

export type ModalOverlay = {
  visible: boolean;
  component?: ReactNode;
  transparent: boolean;
  dismissable: boolean;
};
