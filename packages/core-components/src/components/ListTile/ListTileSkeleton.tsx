import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@colony/core-theme";
import { SkeletonLoader } from "../SkeletonLoader";

const ListTileSkeleton = () => {
  const { colors, borderRadii } = useTheme();
  return (
    <SkeletonLoader>
      <View
        style={[
          styles.skeletonItem,
          {
            backgroundColor: colors.skeleton,
            borderRadius: borderRadii.medium,
          },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colors.onSkeleton }]} />
        <View style={styles.textWrapper}>
          <View
            style={[styles.textLine, { backgroundColor: colors.onSkeleton }]}
          />
          <View
            style={[
              styles.textLine,
              styles.shortLine,
              { backgroundColor: colors.onSkeleton },
            ]}
          />
        </View>
      </View>
    </SkeletonLoader>
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
