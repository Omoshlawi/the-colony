import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  EmptyState,
  ErrorState,
  ThemedPageLayout,
  When,
} from "@colony/core-components";
import { useListings } from "../hooks";
import { Box, Text } from "@colony/core-theme";

const Listings = () => {
  const listingsAsync = useListings();

  return (
    <ThemedPageLayout>
      <When
        asyncState={{ ...listingsAsync, data: listingsAsync.listings }}
        loading={() => <Text>Loading ...</Text>}
        error={(error) => <ErrorState error={error} />}
        success={(listings) => {
          if (listings.length === 0)
            return <EmptyState message="No listings" />;
          return (
            <FlatList
              data={listings}
              keyExtractor={(l) => l.id}
              renderItem={({ item }) => (
                <Box>
                  <Text>{item.title}</Text>
                </Box>
              )}
            />
          );
        }}
      />
    </ThemedPageLayout>
  );
};

export default Listings;

const styles = StyleSheet.create({});
