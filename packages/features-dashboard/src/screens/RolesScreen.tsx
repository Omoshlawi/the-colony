import {
  ActionsBottomSheet,
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { RolesForm } from "../forms";
import { useRoles } from "../hooks";

const RolesScreen = () => {
  const rolesAsync = useRoles();

  const handleAdd = () => {
    const dispose = showModal(<RolesForm onSuccess={() => dispose()} />, {
      title: "Add Role",
    });
  };

  return (
    <StyledPageLayout>
      <AppBar
        title="Roles"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1}>
        <When
          asyncState={{ ...rolesAsync, data: rolesAsync.roles }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(error) => <ErrorState error={error} />}
          success={(roles) => {
            if (!roles?.length) return <EmptyState message="No Roles" />;
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
          }}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default RolesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
