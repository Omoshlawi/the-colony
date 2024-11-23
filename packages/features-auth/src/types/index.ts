import { z } from "zod";
import { LoginShema, RegisterSchema } from "../utils";

export type LoginFormData = z.infer<typeof LoginShema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export interface User {
  id: string;
  username: string;
  profileUpdated: boolean;
  accountVerified: any;
  voided: boolean;
  isAdmin: boolean;
  password: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  person?: Person;
  accounts?: Account[];
}

export interface Person {
  id: string;
  firstName?: string;
  lastName?: string;
  surname?: string;
  userId?: string;
  avatarUrl?: string;
  phoneNumber: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  name?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  refresh_expire_at?: string;
  access_token?: string;
  expires_at?: string;
  token_type?: string;
  scope?: string;
  voided: boolean;
  id_token?: string;
  createdAt: string;
  updatedAt: string;
}
