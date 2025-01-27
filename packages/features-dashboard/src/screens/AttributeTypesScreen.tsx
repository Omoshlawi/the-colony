import {
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  Button,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AttributeTypesForm } from "../forms";
import { useAttributeTypes } from "../hooks";
import { AttributeType } from "../types";
const AttributeTypesScreen = () => {
  const attributeTypesAsync = useAttributeTypes();
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
          <Button
            title="Update"
            variant="tertiary"
            onPress={() => {
              handleUpdateAttributeType(attributeType);
            }}
          />
          <Button
            title="Delete"
            variant="tertiary"
            onPress={() => {
              dispose();
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${attributeType.name} actions` }
    );
  };
  const handleAddAttributeType = () => {
    const dispose = showModal(
      <AttributeTypesForm onSuccess={() => dispose()} />,
      {
        title: "Add Attribute type",
      }
    );
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Attribute types"
        actions={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleAddAttributeType}
          >
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{
            ...attributeTypesAsync,
            data: attributeTypesAsync.attributeTypes,
          }}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          error={(error) => <ErrorState error={error} />}
          success={(attributeTypes) => {
            if (!attributeTypes?.length)
              return <EmptyState message="No attribute types" />;
            return (
              <FlatList
                style={styles.scrollable}
                data={attributeTypes}
                keyExtractor={(amenity) => amenity.id}
                renderItem={({ item }) => (
                  <ListTile
                    onPress={() => handleLaunchBottomsheet(item)}
                    title={item.name}
                    subtitle={item.icon.name}
                    leading={
                      <ExpoIconComponent {...(item.icon as any)} size={24} />
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

export default AttributeTypesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
