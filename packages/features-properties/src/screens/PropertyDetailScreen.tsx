import { getHiveFileUrl } from "@colony/core-api";
import { ErrorState, ImageViewer, When } from "@colony/core-components";
import { useUserPreferedTheme } from "@colony/core-global";
import { Box, Color, Text } from "@colony/core-theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useProperty } from "../hooks/useProperties";
import { PropertyCategories } from "../widgets";
import PropertyFeedbackSummary from "../widgets/PropertyFeedbackSummary";

const PropertyDetailScreen = () => {
  const { propertyId } = useLocalSearchParams();
  const propertydetailAsync = useProperty(propertyId as string);
  const theme = useUserPreferedTheme();
  return (
    <Box backgroundColor={"background"} flex={1}>
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
              <View style={[styles.header]}>
                <ImageViewer
                  source={getHiveFileUrl(property.thumbnail)}
                  style={styles.bg}
                />
                <View
                  style={[
                    styles.bg,
                    {
                      backgroundColor: Color(
                        theme === "dark" ? "black" : "white"
                      )
                        .alpha(0.5)
                        .toString(),
                    },
                  ]}
                />
              </View>
              <Box padding={"m"} gap={"m"}>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  gap={"m"}
                  alignItems={"center"}
                >
                  <PropertyCategories
                    propertyCategories={property.categories}
                  />
                  <PropertyFeedbackSummary />
                </Box>
                <Box>
                  <Text color={"text"} variant={"headlineMedium"}>
                    {property?.name}
                  </Text>
                  <Text color={"hintColor"}>{`${
                    property?.address?.ward ?? ""
                  } ${property?.address?.subCounty ?? ""}, ${
                    property?.address?.county ?? ""
                  }`}</Text>
                </Box>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get("window").height / 3,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
