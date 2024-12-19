import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { usePrivileges } from "../hooks";
import { Privilege } from "../types";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
} from "@colony/core-components";
import { PrivilegeForm } from "../forms";
import { Box } from "@colony/core-theme";
import { handleApiErrors } from "@colony/core-api";

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

  if (error)
    return (
      <ErrorState
        message={`${error?.message}`}
        detail={handleApiErrors(error)?.detail}
      />
    );

  if (!privileges.length) return <EmptyState message="No privileges" />;

  return (
    <FlatList
      style={styles.scrollable}
      data={privileges}
      keyExtractor={(amenity) => amenity.id}
      renderItem={({ item }) => (
        <ListTile
          // onPress={() => handleLaunchBottomsheet(item)}
          title={item.name}
          subtitle={item.description}
          leading={
            <ExpoIconComponent
              {...{ family: "MaterialCommunityIcons", name: "security" }}
              size={24}
              color="#09b9e8"
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
      ListEmptyComponent={EmptyState}
    />
  );
};

export default Privileges;
const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
