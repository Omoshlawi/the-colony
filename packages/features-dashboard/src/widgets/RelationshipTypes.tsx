import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
} from "@colony/core-components";
import { RelationshipTypesForm } from "../forms";
import { RelationshipType } from "../types";
import { useRelationshipTypes } from "../hooks";
import { Box } from "@colony/core-theme";

const RelationshipTypes = () => {
  const { relationshipTypes, error, isLoading } = useRelationshipTypes();

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
    <View style={styles.scrollable}>
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
    </View>
  );
};

export default RelationshipTypes;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
