import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoles } from "../hooks";
import { Box } from "@colony/core-theme";
import {
  ActionsBottomSheet,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
} from "@colony/core-components";
import { handleApiErrors } from "@colony/core-api";
import { RolesForm } from "../forms";

const Roles = () => {
  const { roles, error, isLoading } = useRoles();

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

  if (!roles.length) return <EmptyState message="No Roles" />;

  return (
    <FlatList
      style={styles.scrollable}
      data={roles}
      keyExtractor={(amenity) => amenity.id}
      renderItem={({ item }) => (
        <ActionsBottomSheet
          // onDelete={() => {}}
          title={`${item.name} actions`}
          formTitle="Update Role"
          renderForm={(dispose) => (
            <RolesForm role={item} onSuccess={dispose} />
          )}
        >
          <ListTile
            // onPress={() => handleLaunchBottomsheet(item)}
            title={item.name}
            disabled
            subtitle={item.description}
            leading={
              <ExpoIconComponent
                {...{ family: "FontAwesome6", name: "user-shield" }}
                size={24}
                color="magenta"
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
        </ActionsBottomSheet>
      )}
    />
  );
};

export default Roles;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
