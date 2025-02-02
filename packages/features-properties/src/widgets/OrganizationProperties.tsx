import { getHiveFileUrl } from "@colony/core-api";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ImageViewer,
  ListTile,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import { Box, theme } from "@colony/core-theme";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useProperties } from "../hooks";
import { RoutePaths } from "../utils";

const OrganizationPropertiesScreen = () => {
  const propertiesAsync = useProperties();

  return (
    <When
      asyncState={{
        ...propertiesAsync,
        data: propertiesAsync.properties,
      }}
      loading={() => (
        <Box gap={"m"}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListTileSkeleton key={index} />
          ))}
        </Box>
      )}
      error={(error) => <ErrorState error={error} />}
      success={(properties) => {
        if (!properties?.length)
          return <EmptyState message="No properties for this organization" />;
        return (
          <FlatList
            data={properties}
            keyExtractor={(property) => property.id}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: RoutePaths.PROPERTY_DETAIL,
                  params: { propertyId: item.id },
                }}
              >
                <ListTile
                  title={item.name}
                  subtitle={new Date(item.createdAt).toLocaleString()}
                  borderBottom
                  leading={
                    <ImageViewer
                      source={getHiveFileUrl(item.thumbnail)}
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
  );
};

export default OrganizationPropertiesScreen;

const styles = StyleSheet.create({
  img: {
    height: 50,
    aspectRatio: 1,
  },
});
