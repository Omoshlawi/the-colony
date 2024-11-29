import { useSecureStorage } from "@colony/core-storage";
import { SESSION_TOKEN_KEY } from "../utils";
import { useEffect, useState } from "react";
import { useAuthAPi } from "./useAuthApi";
import { TokenPair, useSessionStore } from "@colony/core-global";

const useLoadInitialAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useSecureStorage<TokenPair>(SESSION_TOKEN_KEY);
  const updateSessionStore = useSessionStore((state) => state.update);
  const { getSessionUserByToken } = useAuthAPi();
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getSessionUserByToken(token.accessToken)
        .then((user) => {
          updateSessionStore({
            session: {
              isAuthenticated: true,
              user,
              token: token,
            },
            cacheSession: (session) => {
              setToken(session.token ?? null);
            },
            clearCache: () => {
              setToken(null);
            },
          });
        })
        .catch((e) => {})
        .finally(() => setIsLoading(false));
    }
  }, [token]);
  return { isLoading };
};

export default useLoadInitialAuthState;
