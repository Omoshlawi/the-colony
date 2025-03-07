import { FlatList, StyleSheet } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  TextInput,
  ThemedPageLayout,
} from "@colony/core-components";
import { dashboardMenuitems } from "../utils/constants";
import { DashboardMenuItem } from "../widgets";
import { Box } from "@colony/core-theme";

const DashboardsScreen = () => {
  return (
    <ThemedPageLayout>
      <Box p={"m"} flex={1}>
        <AppBar title="App Menu" leading={false} />
        <Box p={"s"} mb={"m"}>
          <TextInput
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
    </ThemedPageLayout>
  );
};

export default DashboardsScreen;

const styles = StyleSheet.create({});
