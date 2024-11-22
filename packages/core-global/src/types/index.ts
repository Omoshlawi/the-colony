export type User = {};

export type Session = {
  isAuthenticated: boolean;
  user?: User;
  token?:string
};

export type ThemeName = "dark"|"light"|"system"

export type UserPreference = {
  theme: ThemeName
}