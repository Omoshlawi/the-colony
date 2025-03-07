import {
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  ThemedPageLayout,
  When,
} from "@colony/core-components";
import { Box, Color, useTheme } from "@colony/core-theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useResources } from "../hooks";
import { RoutePaths } from "../utils";

const ResourcesScreen = () => {
  const resoucesAsync = useResources();
  const theme = useTheme();
  const router = useRouter();
  return (
    <ThemedPageLayout>
      <AppBar
        title="Resources"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{ ...resoucesAsync, data: resoucesAsync.resources }}
          error={(error) => <ErrorState error={error} />}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          success={(data) => {
            if (data.length === 0) return <EmptyState message="No resources" />;
            return (
              <FlatList
                style={styles.scrollable}
                data={data}
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
            );
          }}
        />

        <TouchableHighlight
          onPress={() => router.navigate(RoutePaths.APP_SERVICES_SCREEN)}
          underlayColor={Color(theme.colors.primary).darken(0.1).string()}
          style={[
            styles.fab,
            {
              backgroundColor: Color(theme.colors.primary)
                .lighten(0.1)
                .string(),
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
      </Box>
    </ThemedPageLayout>
  );
};

export default ResourcesScreen;

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
