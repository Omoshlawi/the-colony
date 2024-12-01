import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModalBottomSheet,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAmenities } from "../hooks";
import { Amenity } from "../types";

const Amenities = () => {
  const { amenities, error, isLoading } = useAmenities();

  const handleLaunchBottomsheet = (amenity: Amenity) => {
    showModalBottomSheet(<Text>{JSON.stringify(amenities, null, 2)}</Text>);
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
