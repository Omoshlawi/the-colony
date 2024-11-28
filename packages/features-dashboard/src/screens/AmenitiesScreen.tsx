import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, StyledPageLayout } from "@colony/core-components";
import { Box } from "@colony/core-theme";

const AmenitiesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title="Amenities" />
      <Box flex={1} p={"m"}>
        <View>
          <Text>Amenities</Text>
        </View>
      </Box>
    </StyledPageLayout>
  );
};

export default AmenitiesScreen;

const styles = StyleSheet.create({});
