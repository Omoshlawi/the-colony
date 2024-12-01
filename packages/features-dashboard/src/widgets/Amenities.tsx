import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAmenities } from "../hooks";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  ModalBottomSheet,
  SkeletonLoader,
  StyledListItem,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";

const Amenities = () => {
  const { amenities, error, isLoading } = useAmenities();
  const [show, setShow] = useState(false);
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
            onPress={() => setShow(true)}
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
      <ModalBottomSheet
        isVisible={show}
        onClose={() => setShow(false)}
        title="Options"
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
