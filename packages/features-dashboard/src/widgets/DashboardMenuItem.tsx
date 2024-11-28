import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { MenuItem } from "../types";
import { Box, useTheme, Text } from "@colony/core-theme";
import { ExpoIconComponent } from "@colony/core-components";
import { useRouter } from "expo-router";

type DashboardMenuItemProps = {
  item: MenuItem;
};

const DashboardMenuItem: FC<DashboardMenuItemProps> = ({ item }) => {
  const router = useRouter();
  const { colors, spacing } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.clickable, { margin: spacing.s }]}
      activeOpacity={0.5}
      onPress={() => router.navigate(item.route)}
    >
      <Box
        p={"m"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"medium"}
        borderWidth={1}
        borderColor={"outline"}
        padding={"m"}
        gap={"m"}
        width={"100%"}
        height={"100%"}
      >
        <ExpoIconComponent {...item.icon} color={colors.icon} />
        <Text color={"icon"} variant={"bodyLarge"} fontWeight={"700"}>
          {item.name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default DashboardMenuItem;

const styles = StyleSheet.create({
  clickable: {
    flexBasis: "29%", // Each item takes up one-third of the row width
    flexGrow: 1, // Allow items to grow uniformly
    aspectRatio: 1, // Maintain square shape
  },
});
