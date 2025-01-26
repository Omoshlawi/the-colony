import { StyleSheet, View } from "react-native";
import React from "react";
import { Box, useTheme, Text } from "@colony/core-theme";
import { ExpoIconComponent } from "@colony/core-components";

const PropertyFeedbackSummary = () => {
  const theme = useTheme();
  return (
    <Box flex={0} flexDirection={"row"} gap={"s"} alignItems={"center"}>
      <ExpoIconComponent
        family="FontAwesome"
        name="star"
        color={theme.colors.primary}
        size={20}
      />
      <Text color={"hintColor"} variant={"bodySmall"}>
        4.5 (712 Reviews)
      </Text>
    </Box>
  );
};

export default PropertyFeedbackSummary;

const styles = StyleSheet.create({});
