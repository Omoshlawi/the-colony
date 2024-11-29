import { create } from "zustand";
import { Session, TokenPair, User } from "../types";

export type SessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  setSessionUser: (user: User) => void;
  setSessionToken: (token: TokenPair, cacheToken?: () => void) => void;
  clearSession: (clearCache?: () => void) => void;
  clearCache?: () => void;
  cacheSession?: (session:Partial<Session>) => void;
  update: (store: Partial<SessionStore>) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  session: { isAuthenticated: false }, // Initial state
  /**
   * Updates the entire session object.
   */
  setSession: (session: Session) => set((state) => ({ ...state, session })),
  /**
   * Updates the user object within the session.
   */
  setSessionUser: (user: User) =>
    set((state) => ({ ...state, session: { ...state.session, user: user } })),
  /**
   * Updates the token object within the session and optionally triggers caching logic.
   */
  setSessionToken: (token: TokenPair, cacheToken?: () => void) => {
    set((state) => ({ ...state, session: { ...state.session, token } }));
    cacheToken?.();
  },
  /**
   * Clears the session state and optionally clears cached data.
   */
  clearSession: (clearCash) => {
    set((state) => ({
      ...state,
      session: {
        isAuthenticated: false,
        user: undefined,
        token: undefined,
        refreshToken: undefined,
      },
    }));
    clearCash?.();
  },
  /**
   * Updates specific keys in the session store.
   */
  update: (store: Partial<SessionStore>) =>
    set((state) => ({
      ...state,
      ...Object.entries(store)?.reduce((prev, [key, val]) => {
        if (val !== undefined && val !== null) {
          return { ...prev, [key]: val };
        }
        return prev;
      }, {}),
    })),
}));
