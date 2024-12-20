import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Resources } from "../widgets";

const ResourcesScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar
        title="Resources"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <Resources />
      </Box>
    </StyledPageLayout>
  );
};

export default ResourcesScreen;

const styles = StyleSheet.create({});
