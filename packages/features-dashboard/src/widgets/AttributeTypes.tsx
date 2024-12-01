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
import { AttributeTypesForm } from "../forms";
import { AttributeType } from "../types";
import { useAttributeTypes } from "../hooks";
import { Box } from "@colony/core-theme";

const AttributeTypes = () => {
  const { attributeTypes, error, isLoading } = useAttributeTypes();
  const handleUpdateAttributeType = (attributeType: AttributeType) => {
    const dispose = showModal(
      <AttributeTypesForm
        onSuccess={() => dispose()}
        attributeType={attributeType}
      />,
      {
        title: "Update Attribute type",
      }
    );
  };

  const handleLaunchBottomsheet = (attributeType: AttributeType) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              handleUpdateAttributeType(attributeType);
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
      { title: `${attributeType.name} actions` }
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
        data={attributeTypes}
        keyExtractor={(amenity) => amenity.id}
        renderItem={({ item }) => (
          <ListTile
            onPress={() => handleLaunchBottomsheet(item)}
            title={item.name}
            subtitle={item.icon.name}
            leading={<ExpoIconComponent {...(item.icon as any)} size={24} />}
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

export default AttributeTypes;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
