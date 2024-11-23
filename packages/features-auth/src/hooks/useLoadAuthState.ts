import { useSecureStorage } from "@colony/core-storage";
import { SESSION_TOKEN_KEY } from "../utils";
import { useEffect, useState } from "react";
import { useAuthAPi } from "./useAuthApi";
import { useSesionStore } from "@colony/core-global";
import { TokenPair } from "../types";

const useLoadAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, _] = useSecureStorage<TokenPair>(SESSION_TOKEN_KEY);
  const setSession = useSesionStore((state) => state.setSession);
  const { getSessionUserByToken } = useAuthAPi();
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getSessionUserByToken(token.accessToken)
        .then((user) => {
          setSession({ isAuthenticated: true, user, token: token.accessToken });
        })
        .catch((e) => {})
        .finally(() => setIsLoading(false));
    }
  }, [token]);
  return { isLoading };
};

export default useLoadAuthState;
