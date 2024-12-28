import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box } from "@colony/core-theme";
import { useProperties } from "../hooks";
import {
  ErrorState,
  ExpansionTile,
  ImageViewer,
  ListTile,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import { getHiveFileUrl } from "@colony/core-api";

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
      success={(properties) => (
        <FlatList
          data={properties}
          keyExtractor={(property) => property.id}
          renderItem={({ item }) => (
            <ExpansionTile
              title={item.name}
              subtitle={item.organization?.name}
              childContainerStyles={{
                padding: 0,
                marginHorizontal: 0,
              }}
              borderBottom
            >
              <ImageViewer
                // source="https://picsum.photos/seed/696/3000/2000"
                source={getHiveFileUrl(item.thumbnail)}
                style={styles.img}
                contentFit="contain"
              />
            </ExpansionTile>
          )}
        />
      )}
    />
  );
};

export default OrganizationPropertiesScreen;

const styles = StyleSheet.create({
  img: {
    height: 200,
  },
});
