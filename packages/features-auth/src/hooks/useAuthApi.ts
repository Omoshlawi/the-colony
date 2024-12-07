import { TokenPair, User, useSessionStore } from "@colony/core-global";
import { LoginFormData, RegisterFormData } from "../types";
import { useSecureStorage } from "@colony/core-storage";
import { SESSION_TOKEN_KEY } from "../utils";
import { hiveFetch } from "@colony/core-api";
import { decode } from "jsonwebtoken";
const loginUser = async (data: LoginFormData) => {
  const resp = await hiveFetch<{ user: User; token: TokenPair }>(
    "/auth/signin/credentials",
    {
      data: data,
      method: "POST",
    }
  );
  const responseData = resp.data;

  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
      user: responseData.user,
      currentOrganization: (decode(responseData.token.accessToken) as any)
        ?.organizationId,
    },
  }));

  return responseData;
};
const registerUser = async (data: RegisterFormData) => {
  const resp = await hiveFetch<{ user: User; token: TokenPair }>(
    "/auth/signup",
    { data: data, method: "POST" }
  );
  const responseData = resp.data;
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
      user: responseData.user,
      currentOrganization: (decode(responseData.token.accessToken) as any)
        ?.organizationId,
    },
  }));
  return responseData;
};

const getSessionUserByToken = async (token: string) => {
  const v = "custom:include(person,accounts)";
  const resp = await hiveFetch<User>("/users/profile", {
    params: { v },
    headers: { "x-access-token": token },
  });
  const responseData = resp.data;
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      user: responseData,
    },
  }));
  return responseData;
};

const logoutUser = () => {
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      isAuthenticated: false,
      token: undefined,
      user: undefined,
      currentOrganization: undefined,
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
    logoutUser: () => {
      logoutUser();
      setToken(null);
    },
  };
};
