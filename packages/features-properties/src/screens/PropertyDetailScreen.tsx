import { getHiveFileUrl } from "@colony/core-api";
import {
  AppBar,
  ErrorState,
  ImageViewer,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useProperty } from "../hooks/useProperties";

const PropertyDetailScreen = () => {
  const { propertyId } = useLocalSearchParams();
  const propertydetailAsync = useProperty(propertyId as string);
  return (
    <When
      asyncState={{
        ...propertydetailAsync,
        data: propertydetailAsync.property,
      }}
      loading={() => <Text>Loading...</Text>}
      error={(error) => <ErrorState error={error} />}
      success={(property) => {
        return (
          <Box flex={1} flexDirection={"column"} height={"100%"}>
            <ImageViewer
              source={getHiveFileUrl(property.thumbnail)}
              style={styles.img}
            />
            <Box padding={"m"}>
              <Text color={"text"}>{property.name}</Text>
              <Text color={"tertiary"}>{property.description}</Text>
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({
  img: {
    height: Dimensions.get("window").height / 3,
  },
});
