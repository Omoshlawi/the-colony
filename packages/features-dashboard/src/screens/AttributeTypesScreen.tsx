import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";

const AttributeTypesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="Amenities" />

      <Box flex={1} p={"m"}>
        <View>
          <Text>attribute types</Text>
        </View>
      </Box>
    </StyledPageLayout>
  );
};

export default AttributeTypesScreen;

const styles = StyleSheet.create({});
