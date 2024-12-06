import { StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren, useState } from "react";
import { useTheme } from "@colony/core-theme";
import { SnackBarOverlay } from "@colony/core-global";

type Props = {
  items?: Array<SnackBarOverlay>;
};

const SnackBar: FC<Props> = ({ items = [] }) => {
  const { spacing } = useTheme();
  if (!items.length) return false;
  return (
    <View
      style={{
        position: "absolute",
        gap: spacing.s,
        bottom: 20,
        left: 0,
        right: 0,
        padding: spacing.m,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {(items ?? []).map((item, index) => (
        <View key={index}>{item.component}</View>
      ))}
    </View>
  );
};

export default SnackBar;
