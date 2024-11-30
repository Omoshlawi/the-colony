import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Amenities } from "../widgets";

const AmenitiesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="Amenities" />
      <Box flex={1} p={"m"}>
        <Amenities />
      </Box>
    </StyledPageLayout>
  );
};

export default AmenitiesScreen;

const styles = StyleSheet.create({});
