import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Box } from "@colony/core-theme";
import { Image } from "expo-image";
import { useUserPreferences } from "@colony/core-global";

type LogoProps = {
  size?: number;
};
const Logo: FC<LogoProps> = ({ size = 100 }) => {
  const {
    userPreferences: { theme },
  } = useUserPreferences();

  if (theme === "light")
    return (
      <Image
        source={require("../../assets/logo-light.png")}
        style={[styles.logo, { width: size, height: size }]}
      />
    );

  return (
    <Image
      source={require("../../assets/logo-dark.png")}
      style={[styles.logo, { width: size, height: size }]}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
