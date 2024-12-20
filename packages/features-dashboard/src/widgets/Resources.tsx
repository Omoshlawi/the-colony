import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showDialog,
} from "@colony/core-components";
import { Box, Color, useTheme } from "@colony/core-theme";
import React from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { useResources } from "../hooks";
import { useRouter } from "expo-router";
import { RoutePaths } from "../utils";

const Resources = () => {
  const { error, isLoading, resources } = useResources();
  const theme = useTheme();
  const router = useRouter();

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
      <TouchableHighlight
        onPress={() => router.navigate(RoutePaths.APP_SERVICES_SCREEN)}
        underlayColor={Color(theme.colors.primary).darken(0.1).string()}
        style={[
          styles.fab,
          {
            backgroundColor: Color(theme.colors.primary).lighten(0.1).string(),
            borderRadius: theme.borderRadii.large,
            padding: 16,
          },
        ]}
      >
        <ExpoIconComponent
          family="MaterialCommunityIcons"
          name="sync"
          size={24}
          color="white"
        />
      </TouchableHighlight>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
