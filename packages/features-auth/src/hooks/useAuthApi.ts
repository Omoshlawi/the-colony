import { TokenPair, User, useSessionStore } from "@colony/core-global";
import axios, { isAxiosError } from "axios";
import { LoginFormData, RegisterFormData } from "../types";
import { useSecureStorage } from "@colony/core-storage";
import { SESSION_TOKEN_KEY } from "../utils";

const httpClient = axios.create({ baseURL: "http://localhost:5000" });

const loginUser = async (data: LoginFormData) => {
  const resp = await httpClient.post("/api/auth/signin/credentials", data);
  const responseData = resp.data as { user: User; token: TokenPair };

  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
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
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
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
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      user: responseData,
    },
  }));
  return responseData;
};

const handleError = <T extends Record<string, unknown>>(
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

const logoutUser = () => {
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      isAuthenticated: false,
      token: undefined,
      user: undefined,
    },
  }));
};

export const useAuthAPi = () => {
  const [, setToken] = useSecureStorage<TokenPair>(SESSION_TOKEN_KEY);

  return {
    loginUser: async (data: LoginFormData) => {
      const response = await loginUser(data);
      setToken(response.token);
      return response;
    },
    registerUser: async (data: RegisterFormData) => {
      const response = await registerUser(data);
      setToken(response.token);
      return response;
    },
    getSessionUserByToken,
    handleError,
    logoutUser: () => {
      logoutUser();
      setToken(null);
    },
  };
};
