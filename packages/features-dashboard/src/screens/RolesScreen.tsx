import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Roles } from "../widgets";
import { RolesForm } from "../forms";

const RolesScreen = () => {
  const handleAdd = () => {
    const dispose = showModal(<RolesForm onSuccess={() => dispose()} />, {
      title: "Add Role",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Roles"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1}>
        <Roles />
      </Box>
    </StyledPageLayout>
  );
};

export default RolesScreen;

const styles = StyleSheet.create({});
