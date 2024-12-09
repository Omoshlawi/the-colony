import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";

const PrivilegesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="Privileges" />
      <Box flex={1}></Box>
    </StyledPageLayout>
  );
};

export default PrivilegesScreen;

const styles = StyleSheet.create({});
