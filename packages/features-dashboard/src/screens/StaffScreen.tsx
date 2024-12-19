import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { StaffSearch } from "../widgets/staff";

const StaffScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar
        title="Staff"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={handleAddRelationshipType}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <StaffSearch />
      </Box>
    </StyledPageLayout>
  );
};

export default StaffScreen;

const styles = StyleSheet.create({});
