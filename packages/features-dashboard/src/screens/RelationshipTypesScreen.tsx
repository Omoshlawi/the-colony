import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { RelationshipTypes } from "../widgets";

const RelationshipTypesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="Amenities" />
      <Box flex={1} p={"m"}>
        <RelationshipTypes />
      </Box>
    </StyledPageLayout>
  );
};

export default RelationshipTypesScreen;

const styles = StyleSheet.create({});
