import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, useTheme } from "@colony/core-theme";
import { Skeleton, SkeletonLoader } from "../SkeletonLoader";

const InputSkeleton = () => {
  const { borderRadii } = useTheme();
  return (
    <Box borderRadius={"medium"} gap={"s"}>
      <Skeleton
        shimmerColor="white"
        style={{ height: 15, width: 150, borderRadius: borderRadii.medium }}
      />
      <Skeleton
        shimmerColor="white"
        style={{ height: 50, width: "100%", borderRadius: borderRadii.medium }}
      />
    </Box>
  );
};

export default InputSkeleton;

const styles = StyleSheet.create({});
