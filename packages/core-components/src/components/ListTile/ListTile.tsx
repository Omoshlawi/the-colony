import { Pressable, StyleSheet, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { Box, Text, useTheme } from "@colony/core-theme";

type ListTileProps = {
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  leading?: ReactNode;
  borderBottom?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

const ListTile: FC<ListTileProps> = ({
  title,
  borderBottom = false,
  leading,
  onPress,
  subtitle,
  trailing,
  disabled = false,
}) => {
  const { colors, spacing } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        borderBottom
          ? { ...styles.borderBottom, borderColor: colors.disabledColor }
          : {},
        styles.container,
        { padding: spacing.m },
      ]}
    >
      <Box borderRadius={"medium"} flex={1} flexDirection={"row"} gap={"m"}>
        {leading}
        <Box gap={"s"}>
          {title && (
            <Text color={"text"} variant={"bodyLarge"}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text color={"outline"} variant={"bodyMedium"}>
              {subtitle}
            </Text>
          )}
        </Box>
      </Box>
      {trailing}
    </Pressable>
  );
};

export default ListTile;

const styles = StyleSheet.create({
  borderBottom: {
    // borderColor: microColors.darkGrey,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
