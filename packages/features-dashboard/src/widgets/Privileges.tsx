import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { usePrivileges } from "../hooks";
import { Privilege } from "../types";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
} from "@colony/core-components";
import { PrivilegeForm } from "../forms";
import { Box } from "@colony/core-theme";

const Privileges = () => {
  const { privileges, error, isLoading } = usePrivileges();

  const handleUpdate = (privilege: Privilege) => {
    const dispose = showModal(
      <PrivilegeForm privilege={privilege} onSuccess={() => dispose()} />,
      { title: "Update privilege" }
    );
  };

  if (isLoading) {
    return (
      <Box gap={"m"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ListTileSkeleton key={index} />
        ))}
      </Box>
    );
  }

  return (
    <FlatList
      style={styles.scrollable}
      data={privileges}
      keyExtractor={(amenity) => amenity.id}
      renderItem={({ item }) => (
        <ListTile
          // onPress={() => handleLaunchBottomsheet(item)}
          title={item.id}
          subtitle={item.id}
          leading={
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name="chevron-right"
              size={24}
            />
          }
          trailing={
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name="chevron-right"
              size={24}
            />
          }
          borderBottom
        />
      )}
    />
  );
};

export default Privileges;
const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
