import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAmenities } from "../hooks";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  SkeletonLoader,
  StyledListItem,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";

const Amenities = () => {
  const { amenities, error, isLoading } = useAmenities();
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
