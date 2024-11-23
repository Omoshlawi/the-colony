import { create } from "zustand";
import { Session, User } from "../types";

export type SessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  setSessionUser: (user: User) => void;
  setSessionToken: (token: string) => void;
  clearSession: () => void;
};

export const useSesionStore = create<SessionStore>((set) => ({
  session: { isAuthenticated: false },
  setSession: (session: Session) => set((state) => ({ ...state, session })),
  setSessionUser: (user: User) =>
    set((state) => ({ ...state, session: { ...state.session, user: user } })),
  setSessionToken: (token: string) =>
    set((state) => ({ ...state, session: { ...state.session, token } })),
  clearSession: () => {
    set((state) => ({
      ...state,
      session: { isAuthenticated: false, user: undefined, token: undefined },
    }));
  },
}));
