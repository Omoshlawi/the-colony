import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Categories } from "../widgets";
import { CategoriesForm } from "../forms";

const CategoriesScreen = () => {
  const handleAddCategory = () => {
    const dispose = showModal(<CategoriesForm onSuccess={() => dispose()} />, {
      title: "Add category",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Categories"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddCategory}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />

      <Box flex={1} p={"m"}>
        <Categories />
      </Box>
    </StyledPageLayout>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
