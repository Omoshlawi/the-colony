import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BoxProps,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import { Theme } from "../theme";
import { Box } from "./box";

const cardVariant = createVariant<Theme, "cardVariants">({
  themeKey: "cardVariants",
  defaults: {
    padding: {
      phone: "s",
      tablet: "m",
      desktop: "l",
    },
    borderRadius: "large",
  },
});

export const Card = createRestyleComponent<
  VariantProps<Theme, "cardVariants"> & BoxProps<Theme>,
  Theme
>([cardVariant], Box);
