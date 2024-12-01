import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { RelationshipTypes } from "../widgets";
import { RelationshipTypesForm } from "../forms";

const RelationshipTypesScreen = () => {
  const handleAddRelationshipType = () => {
    const dispose = showModal(
      <RelationshipTypesForm onSuccess={() => dispose()} />,
      {
        title: "Add relationship type",
      }
    );
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Relationship types"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleAddRelationshipType}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <RelationshipTypes />
      </Box>
    </StyledPageLayout>
  );
};

export default RelationshipTypesScreen;

const styles = StyleSheet.create({});
