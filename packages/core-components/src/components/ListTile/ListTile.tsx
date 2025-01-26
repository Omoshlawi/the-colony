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
};

const ListTile: FC<ListTileProps> = ({
  title,
  borderBottom = false,
  leading,
  onPress,
  subtitle,
  trailing,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Pressable
      onPress={onPress}
      disabled={typeof onPress === "function" ? false : true}
      style={[
        styles.tile,
        {
          padding: theme.spacing.s,
          gap: theme.spacing.s,
          borderColor: colors.hintColor,
        },
        borderBottom ? styles.borderBottom : {},
      ]}
    >
      {leading}
      <Box width={"100%"} flex={1} gap={"s"} justifyContent={"center"}>
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
  tile: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
});
