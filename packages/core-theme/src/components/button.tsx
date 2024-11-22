import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  BoxProps,
} from "@shopify/restyle";
import { Theme } from "../theme";
import { Box } from "./box";
import { Button as RNButton } from "react-native";

const buttonVariant = createVariant<Theme, "buttonVariants">({
  themeKey: "buttonVariants",
  defaults: {
    padding: {
      phone: "s",
      tablet: "m",
      desktop: "l",
    },
    borderRadius: "large",
  },
});

export const Button = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & BoxProps<Theme>,
  Theme
>([buttonVariant], Box);
