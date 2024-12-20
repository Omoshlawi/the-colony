import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useResources } from "../hooks";
import { Box } from "@colony/core-theme";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
} from "@colony/core-components";

const Resources = () => {
  const { error, isLoading, resources } = useResources();

  if (isLoading) {
    return (
      <Box gap={"m"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ListTileSkeleton key={index} />
        ))}
      </Box>
    );
  }

  if (error) return <ErrorState error={error} />;

  if (resources.length === 0) return <EmptyState message="No resources" />;

  return (
    <View style={styles.scrollable}>
      <FlatList
        style={styles.scrollable}
        data={resources}
        keyExtractor={(amenity) => amenity.id}
        renderItem={({ item }) => (
          <ListTile
            // onPress={() => handleLaunchBottomsheet(item)}
            title={item.name}
            subtitle={item.dataPoints?.join(", ")}
            leading={
              <ExpoIconComponent
                {...{ family: "FontAwesome", name: "server" }}
                size={24}
                color="#38b6ff"
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

export default Resources;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
