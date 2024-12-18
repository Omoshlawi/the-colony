import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@colony/core-theme";
import { Skeleton } from "../SkeletonLoader";

const ListTileSkeleton = () => {
  const { colors, borderRadii } = useTheme();
  return (
    <View
      style={[
        styles.skeletonItem,
        {
          backgroundColor: colors.onSkeleton,
          borderRadius: borderRadii.medium,
        },
      ]}
    >
      <Skeleton style={styles.avatar} gradientOpacity={0.5} />
      <View style={styles.textWrapper}>
        <Skeleton
          style={styles.textLine}
          shimmerColor={colors.onSkeleton}
          gradientOpacity={0.5}
        />
        <Skeleton
          style={[styles.textLine, styles.shortLine]}
          gradientOpacity={0.5}
        />
      </View>
    </View>
  );
};

export default ListTileSkeleton;

const styles = StyleSheet.create({
  skeletonItem: {
    height: 80,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  textLine: {
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
  shortLine: {
    width: "60%",
  },
});
