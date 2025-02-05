import {
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ImageViewer,
  ListTile,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import { Box, useTheme } from "@colony/core-theme";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useListings } from "../hooks";
import { RoutePaths } from "../utils";
import { getHiveFileUrl } from "@colony/core-api";

const OrganizationListingsScreen = () => {
  const listingsAsync = useListings();
  const theme = useTheme();
  return (
    <Box flex={1}>
      <AppBar
        title="Listings"
        actions={
          <TouchableOpacity activeOpacity={0.5}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{ ...listingsAsync, data: listingsAsync.listings }}
          error={(error) => <ErrorState error={error} />}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          success={(listings) => {
            if (listings.length === 0) {
              return <EmptyState message="No amenities" />;
            }
            return (
              <FlatList
                style={styles.scrollable}
                data={listings}
                keyExtractor={(listingItem) => listingItem.id}
                renderItem={({ item }) => (
                  <Link
                    href={{
                      pathname: RoutePaths.LISTING_DETAIL_SCREEN,
                      params: { listingId: item.id },
                    }}
                  >
                    <ListTile
                      title={item.title}
                      subtitle={new Date(item.createdAt).toLocaleString()}
                      borderBottom
                      leading={
                        <ImageViewer
                          source={getHiveFileUrl(item.property.thumbnail)}
                          style={[
                            styles.img,
                            { borderRadius: theme.borderRadii.medium },
                          ]}
                        />
                      }
                      trailing={
                        <ExpoIconComponent
                          family="Entypo"
                          name="chevron-small-right"
                        />
                      }
                    />
                  </Link>
                )}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default OrganizationListingsScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
  img: {
    height: 50,
    aspectRatio: 1,
  },
});
