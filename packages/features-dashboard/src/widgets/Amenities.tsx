import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showDialog,
  showModal,
  showModalBottomSheet,
  StyledButton,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAmenities } from "../hooks";
import { Amenity } from "../types";
import { AmenitiesForm } from "../forms";

const Amenities = () => {
  const { amenities, error, isLoading } = useAmenities();

  const handleUpdate = (amenity: Amenity) => {
    const dispose = showModal(
      <AmenitiesForm amenity={amenity} onSuccess={() => dispose()} />,
      { title: "Update amenity" }
    );
  };

  const handleLaunchBottomsheet = (amenity: Amenity) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              handleUpdate(amenity);
            }}
          />
          <StyledButton
            title="Delete"
            variant="outline"
            onPress={() => {
              dispose();
              handleUpdate;
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${amenity.name} actions` }
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

  if (error) {
    return <ErrorState error={error} />;
  }

  if (amenities.length === 0) {
    return <EmptyState message="No amenities" />;
  }
  return (
    <View style={styles.scrollable}>
      <FlatList
        style={styles.scrollable}
        data={amenities}
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

export default Amenities;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
