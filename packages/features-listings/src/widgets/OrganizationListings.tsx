import {
  AlertDialog,
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ImageViewer,
  ListTile,
  ListTileSkeleton,
  SeachableDropDown,
  showDialog,
  showModal,
  ThemedPageLayout,
  TextInput,
  When,
} from "@colony/core-components";
import { Box, useTheme } from "@colony/core-theme";
import { Link } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useListingApi, useListings } from "../hooks";
import { RoutePaths } from "../utils";
import { getHiveFileUrl } from "@colony/core-api";
import { ListingForm } from "../forms";
import { Property } from "../types";

const OrganizationListings = () => {
  const listingsAsync = useListings();
  const { searchProperty } = useListingApi();
  const theme = useTheme();
  const handleAddListing = useCallback(() => {
    const dispose = showDialog(
      <AlertDialog
        title="Search property to list"
        message={() => (
          <TextInput
            prefixIcon={<ExpoIconComponent family="Feather" name="search" />}
            placeholder="Search property ..."
          />
        )}
        // actions={[
        //   {
        //     title: "Cancel",
        //     onPress: () => dispose(),
        //     color: theme.colors.error,
        //   },
        //   {
        //     title: "Continue",
        //     onPress: () => dispose(),
        //     color: theme.colors.primary,
        //   },
        // ]}
      />
    );
  }, []);
  return (
    <ThemedPageLayout>
      <AppBar
        title="Listings"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddListing}>
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
    </ThemedPageLayout>
  );
};

export default OrganizationListings;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
  img: {
    height: 50,
    aspectRatio: 1,
  },
  propertythumbnail: {
    width: 50,
    aspectRatio: 1,
  },
});
