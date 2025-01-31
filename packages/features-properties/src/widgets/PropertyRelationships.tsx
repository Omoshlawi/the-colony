import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
import { Box, Color, useTheme } from "@colony/core-theme";
import { useRelationships } from "../hooks";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ImageViewer,
  ListTile,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import { getHiveFileUrl } from "@colony/core-api";

type Props = {
  property: Property;
};

const PropertyRelationships: FC<Props> = ({ property }) => {
  const relationshipAsync = useRelationships({
    propertyId: property.id,
    v: "custom:include(propertyA,propertyB,type)",
  });
  const theme = useTheme();
  return (
    <Box flex={1} pt={"m"}>
      <When
        asyncState={{
          ...relationshipAsync,
          data: relationshipAsync.relationsShips,
        }}
        error={(e) => <ErrorState error={e} />}
        loading={() => (
          <Box gap={"m"}>
            {Array.from({ length: 5 }).map((_, i) => (
              <ListTileSkeleton key={i} />
            ))}
          </Box>
        )}
        success={(relationships) => {
          if (relationships.length === 0)
            return (
              <EmptyState message="No related propertyies for this property" />
            );
          return (
            <FlatList
              data={relationships}
              keyExtractor={(e) => e.id}
              renderItem={({ item }) => {
                if (item.propertyAId === property.id) {
                  // render property b
                  return (
                    <ListTile
                      containerStyles={{
                        backgroundColor: Color(theme.colors.hintColor)
                          .alpha(0.2)
                          .toString(),
                      }}
                      borderBottom
                      title={item.propertyB!.name}
                      subtitle={`${item.type!.bIsToA} ${property.name}`}
                      leading={
                        <ImageViewer
                          source={getHiveFileUrl(item.propertyB!.thumbnail)}
                          style={styles.propertythumbnail}
                        />
                      }
                      trailing={
                        <ExpoIconComponent
                          family="MaterialCommunityIcons"
                          name="chevron-right"
                        />
                      }
                    />
                  );
                }
                // render property A
                return (
                  <ListTile
                    borderBottom
                    containerStyles={{
                      backgroundColor: Color(theme.colors.hintColor)
                        .alpha(0.2)
                        .toString(),
                    }}
                    title={item.propertyA!.name}
                    subtitle={`${item.type!.aIsToB} ${property.name}`}
                    leading={
                      <ImageViewer
                        source={getHiveFileUrl(item.propertyA!.thumbnail)}
                        style={styles.propertythumbnail}
                      />
                    }
                    trailing={
                      <ExpoIconComponent
                        family="MaterialCommunityIcons"
                        name="chevron-right"
                      />
                    }
                  />
                );
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default PropertyRelationships;

const styles = StyleSheet.create({
  propertythumbnail: {
    width: 50,
    aspectRatio: 1,
  },
});
