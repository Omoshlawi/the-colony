import { createBox, createText, createTheme } from "@shopify/restyle";
import { pallet } from "../colors";

export const theme = createTheme({
  colors: {
    text: pallet.lightBlack,
    background: pallet.white,
    tint: pallet.blue,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: pallet.blue,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export const darktheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    // TODO update dark theme colors
    text: pallet.lightGrey,
    background: pallet.darkGrey,
    tint: pallet.white,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: pallet.blue,
  },
};

export type Theme = typeof theme;
