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
import {
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { PrivilegeForm } from "../forms";
import { usePrivileges } from "../hooks";

const PrivilegesScreen = () => {
  const privilegesAsync = usePrivileges();
  const handleAdd = () => {
    const dispose = showModal(<PrivilegeForm onSuccess={() => dispose()} />, {
      title: "Add Privilege",
    });
  };

  return (
    <StyledPageLayout>
      <AppBar
        title="Privileges"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1}>
        <When
          asyncState={{ ...privilegesAsync, data: privilegesAsync.privileges }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(error) => <ErrorState error={error} />}
          success={(privileges) => {
            if (!privileges.length)
              return <EmptyState message="No privileges" />;

            return (
              <FlatList
                style={styles.scrollable}
                data={privileges}
                keyExtractor={(amenity) => amenity.id}
                renderItem={({ item }) => (
                  <ActionsBottomSheet
                    title={`${item.name} Actions`}
                    formTitle="Update Privilege"
                    renderForm={(dispose) => (
                      <PrivilegeForm privilege={item} onSuccess={dispose} />
                    )}
                  >
                    <ListTile
                      title={item.name}
                      subtitle={item.description}
                      leading={
                        <ExpoIconComponent
                          {...{
                            family: "MaterialCommunityIcons",
                            name: "security",
                          }}
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
                  </ActionsBottomSheet>
                )}
                ListEmptyComponent={EmptyState}
              />
            );
          }}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default PrivilegesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
