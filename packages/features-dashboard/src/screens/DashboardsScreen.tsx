import { FlatList, StyleSheet } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  StyledInput,
  StyledPageLayout,
} from "@colony/core-components";
import { dashboardMenuitems } from "../utils/constants";
import { DashboardMenuItem } from "../widgets";
import { Box } from "@colony/core-theme";

const DashboardsScreen = () => {
  return (
    <StyledPageLayout>
      <Box p={"m"} flex={1}>
        <AppBar title="App Menu" leading={false} />
        <Box p={"s"} mb={"m"}>
          <StyledInput
            placeholder="search ..."
            suffixIcon={<ExpoIconComponent family="EvilIcons" name="search" />}
          />
        </Box>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          numColumns={3}
          data={dashboardMenuitems}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => <DashboardMenuItem item={item} />}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default DashboardsScreen;

const styles = StyleSheet.create({});
