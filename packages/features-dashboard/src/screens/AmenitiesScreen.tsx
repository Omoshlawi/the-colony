import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ClickableModalWrapper,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Amenities } from "../widgets";
import { AmenitiesForm } from "../forms";

const AmenitiesScreen = () => {
  const handleAddAmenity = () => {
    const dispose = showModal(<AmenitiesForm onSuccess={() => dispose()} />, {
      title: "Add amenity",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Amenities"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddAmenity}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
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
