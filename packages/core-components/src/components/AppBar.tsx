import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { Box, Text, useTheme } from "@colony/core-theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type AppBarProps = {
  title?: string;
  leading?: ReactNode;
  actions?: ReactNode;
};

const AppBar: FC<AppBarProps> = ({ title, leading, actions }) => {
  const {
    colors: { icon },
  } = useTheme();
  const router = useRouter();
  return (
    <Box
      paddingHorizontal={"m"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box gap={"s"} flexDirection={"row"}>
        {leading ?? (
          <TouchableOpacity
            onPress={() => (router.canGoBack() ? router.back() : undefined)}
          >
            <Ionicons name="chevron-back" size={30} color={icon} />
          </TouchableOpacity>
        )}
        {title && (
          <Text variant={"titleLarge"} color={"text"}>
            {title}
          </Text>
        )}
      </Box>
      {actions}
    </Box>
  );
};

export default AppBar;

const styles = StyleSheet.create({});
