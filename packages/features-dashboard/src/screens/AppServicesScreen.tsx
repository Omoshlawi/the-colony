import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, ThemedPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { AppServices } from "../widgets";

const AppServicesScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title="App services" />
      <Box flex={1} p={"m"}>
        <AppServices />
      </Box>
    </ThemedPageLayout>
  );
};

export default AppServicesScreen;

const styles = StyleSheet.create({});
