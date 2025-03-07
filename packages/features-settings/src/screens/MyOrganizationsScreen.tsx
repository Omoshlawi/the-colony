import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  ThemedPageLayout,
} from "@colony/core-components";
import { OrganizationForm } from "../forms";
import { Box } from "@colony/core-theme";
import { MyOrganizations } from "../widgets";

export const MyOrganizationsScreen = () => {
  const handleAdd = () => {
    const dispose = showModal(
      <OrganizationForm onSuccess={() => dispose()} />,
      {
        title: "Add organization",
      }
    );
  };
  return (
    <ThemedPageLayout>
      <AppBar
        title="My Organizations"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1}>
        <MyOrganizations />
      </Box>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({});
