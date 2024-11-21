export type User = {};

export type Session = {
  isAuthenticated: boolean;
  user?: User;
  token?:string
};