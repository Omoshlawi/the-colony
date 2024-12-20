import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { AppServices } from "../widgets";

const AppServicesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="App services" />
      <Box flex={1} p={"m"}>
        <AppServices />
      </Box>
    </StyledPageLayout>
  );
};

export default AppServicesScreen;

const styles = StyleSheet.create({});
