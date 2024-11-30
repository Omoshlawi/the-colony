import { StyleSheet } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useAttributeTypes } from "../hooks";
const AttributeTypesScreen = () => {
  const { isLoading, attributeTypes, error } = useAttributeTypes();
  return (
    <StyledPageLayout>
      <AppBar title="Amenities" />
      <Box flex={1} p={"m"}>
        <Text>{JSON.stringify(attributeTypes, null, 2)}</Text>
        <Text>{JSON.stringify(error?.response?.data, null, 2)}</Text>
      </Box>
    </StyledPageLayout>
  );
};

export default AttributeTypesScreen;

const styles = StyleSheet.create({});
