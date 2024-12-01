import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useAttributeTypes } from "../hooks";
import { AttributeTypes } from "../widgets";
import { AttributeTypesForm } from "../forms";
const AttributeTypesScreen = () => {
  const handleAddAttributeType = () => {
    const dispose = showModal(
      <AttributeTypesForm onSuccess={() => dispose()} />,
      {
        title: "Add Attribute type",
      }
    );
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Attribute types"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleAddAttributeType}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <AttributeTypes />
      </Box>
    </StyledPageLayout>
  );
};

export default AttributeTypesScreen;

const styles = StyleSheet.create({});
