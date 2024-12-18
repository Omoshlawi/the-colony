import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Privileges } from "../widgets";
import { PrivilegeForm } from "../forms";

const PrivilegesScreen = () => {
  const handleAdd = () => {
    const dispose = showModal(<PrivilegeForm onSuccess={() => dispose()} />, {
      title: "Add Privilege",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Privileges"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1}>
        <Privileges />
      </Box>
    </StyledPageLayout>
  );
};

export default PrivilegesScreen;

const styles = StyleSheet.create({});
