import { create } from "zustand";

type User = {};

export type Session = {
  isAuthenticated: boolean;
  user?: User;
};

export type SessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  setSessionUser: (user: User) => void;
};

export const useSesionStore = create<SessionStore>((set) => ({
  session: { isAuthenticated: false },
  setSession: (session: Session) => set({ session }),
  setSessionUser: (user: User) =>
    set((state) => ({ ...state, session: { ...state.session, user: user } })),
}));
