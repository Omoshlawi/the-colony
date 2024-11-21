import { useSesionStore } from "./useSessionStore";

export const useSession = () => {
  const session = useSesionStore((state) => state.session);
  return session;
};
