import { User, useSesionStore } from "@colony/core-global";
import axios, { isAxiosError } from "axios";
import { LoginFormData, RegisterFormData, TokenPair } from "../types";
import { unknown } from "zod";

const httpClient = axios.create({ baseURL: "http://localhost:5000" });

const loginUser = async (data: LoginFormData) => {
  const resp = await httpClient.post("/api/auth/signin/credentials", data);
  const responseData = resp.data as { user: User; token: TokenPair };

  useSesionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token.accessToken,
      user: responseData.user,
    },
  }));

  return responseData;
};
const registerUser = async (data: RegisterFormData) => {
  const resp = await httpClient.post("/api/auth/signup", data);
  const responseData = resp.data as {
    user: User;
    token: TokenPair;
  };
  useSesionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token.accessToken,
      user: responseData.user,
    },
  }));
  return responseData;
};

const getSessionUserByToken = async (token: string) => {
  const v = "custom:include(person,accounts)";
  const resp = await httpClient.get("/api/users/profile", {
    params: { v },
    headers: { "x-access-token": token },
  });
  const responseData = resp.data as User;
  useSesionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      user: responseData,
    },
  }));
  return responseData;
};

export const handleError = <T extends Record<string, unknown>>(
  error: any
): { [field in keyof T]?: string } & { detail?: string } => {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      return Object.entries(error.response?.data ?? {}).reduce(
        (prev, [key, value]) => {
          if (key === "_errors")
            return { ...prev, detail: (value as string[]).join(", ") };
          return {
            ...prev,
            [key]: (value as { _errors: string[] })._errors.join(", "),
          };
        },
        {}
      );
    }
    return {
      detail: error?.response?.data ?? error.message ?? "Unknown error occured",
    };
  }
  return {
    detail: error?.message ?? "Unknown error occured",
  };
};

export const useAuthAPi = () => {
  return { loginUser, registerUser, getSessionUserByToken, handleError };
};
