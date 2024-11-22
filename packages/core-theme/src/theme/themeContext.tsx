import { useUserPreferences } from "@colony/core-global";
import {
  ThemeProvider as RThemeProvider,
  useTheme as useRTheme,
} from "@shopify/restyle";
import React, { FC, PropsWithChildren } from "react";
import { darktheme, theme, Theme } from "./appTheme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    userPreferences: { theme: themeName },
  } = useUserPreferences();
  return (
    <RThemeProvider theme={themeName === "dark" ? darktheme : theme}>
      {children}
    </RThemeProvider>
  );
};

export const useTheme = () => {
  const theme = useRTheme<Theme>();
  return theme;
};
