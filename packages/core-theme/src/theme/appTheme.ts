import { createBox, createText, createTheme } from "@shopify/restyle";
import { darkColorScheme, lightColorScheme, pallet } from "../colors";
import { textVariantsLight } from "../text-variants";

export const theme = createTheme({
  colors: {
    text: pallet.lightBlack,
    tint: pallet.blue,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: pallet.blue,
    // primary: pallet.blue,
    disabled: pallet.darkRed,
    // onPrimary: pallet.greyBlue,
    ...lightColorScheme,
    // background: pallet.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: textVariantsLight,
  breakpoints: {
    phone: 0,
    tablet: 600, // Tablets typically have 600px or higher width
    desktop: 1024, // Desktop screens generally have 1024px or higher width
  },
  borderRadii: {
    small: 4,
    medium: 8,
    large: 16,
  },
  zIndices: {
    low: 1,
    medium: 10,
    high: 100,
    overlay: 1000,
  },
  buttonVariants: {
    defaults: { padding: "m" },
    outlined: {
      borderWidth: 1,
      borderColor: "primary",
      backgroundColor: "transparent",
      color: "text",
    },
    filled: { backgroundColor: "primary", color: "onPrimary" },
    elevated: {
      backgroundColor: "primary",
      color: "onPrimary",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
    text: { backgroundColor: "transparent", color: "primary" },
  },
  cardVariants: {},
});

export const darktheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: pallet.lightGrey,
    tint: pallet.white,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: pallet.blue,
    ...darkColorScheme,
    // background: pallet.dark,
  },
};

export type Theme = typeof theme;
