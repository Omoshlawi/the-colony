import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ClickableModalWrapper,
  ExpoIconComponent,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Amenities } from "../widgets";
import { AmenitiesForm } from "../forms";

const AmenitiesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar
        title="Amenities"
        actions={
          <ClickableModalWrapper
            title="Add Amenity"
            content={<AmenitiesForm />}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </ClickableModalWrapper>
        }
      />
      <Box flex={1} p={"m"}>
        <Amenities />
      </Box>
    </StyledPageLayout>
  );
};

export default AmenitiesScreen;

const styles = StyleSheet.create({});
