import {
  AppBar,
  EmptyState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { RelationshipTypesForm } from "../forms";
import { useRelationshipTypes } from "../hooks";
import { RelationshipType } from "../types";

const RelationshipTypesScreen = () => {
  const relationshipTypesAsync = useRelationshipTypes();

  const handleUpdateRelationshipType = (relationshipType: RelationshipType) => {
    const dispose = showModal(
      <RelationshipTypesForm
        onSuccess={() => dispose()}
        relationshipType={relationshipType}
      />,
      {
        title: "Update relationship type",
      }
    );
  };

  const handleLaunchBottomsheet = (relationshipType: RelationshipType) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              handleUpdateRelationshipType(relationshipType);
            }}
          />
          <StyledButton
            title="Delete"
            variant="outline"
            onPress={() => {
              dispose();
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${relationshipType.aIsToB} actions` }
    );
  };
  const handleAddRelationshipType = () => {
    const dispose = showModal(
      <RelationshipTypesForm onSuccess={() => dispose()} />,
      {
        title: "Add relationship type",
      }
    );
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Relationship types"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleAddRelationshipType}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{
            ...relationshipTypesAsync,
            data: relationshipTypesAsync.relationshipTypes,
          }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          success={(relationshipTypes) => {
            if (!relationshipTypes?.length)
              return <EmptyState message="No relationship types" />;
            return (
              <FlatList
                style={styles.scrollable}
                data={relationshipTypes}
                keyExtractor={(amenity) => amenity.id}
                renderItem={({ item }) => (
                  <ListTile
                    onPress={() => handleLaunchBottomsheet(item)}
                    title={item.aIsToB}
                    subtitle={item.bIsToA}
                    leading={
                      <ExpoIconComponent
                        family="MaterialIcons"
                        name="account-tree"
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
          }}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default RelationshipTypesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
