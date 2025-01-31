import {
  ErrorState,
  ExpoIconComponent,
  TabView,
  When,
} from "@colony/core-components";
import { Box, Text, useTheme } from "@colony/core-theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useProperty } from "../hooks/useProperties";
import {
  PropertyAbout,
  PropertyCategories,
  PropertyDetailHeader,
  PropertyMediaWidget,
  PropertyRelationships,
  PropertyReviews,
} from "../widgets";
import PropertyFeedbackSummary from "../widgets/PropertyFeedbackSummary";

const PropertyDetailScreen = () => {
  const { propertyId } = useLocalSearchParams();
  const propertydetailAsync = useProperty(propertyId as string);
  const theme = useTheme();
  return (
    <Box backgroundColor={"background"} flex={1}>
      <When
        asyncState={{
          ...propertydetailAsync,
          data: propertydetailAsync.property,
        }}
        loading={() => (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <ActivityIndicator color={theme.colors.primary} size={100} />
          </Box>
        )}
        error={(error) => <ErrorState error={error} />}
        success={(property) => {
          return (
            <Box flex={1} flexDirection={"column"} height={"100%"}>
              <PropertyDetailHeader property={property} />
              <Box padding={"m"} gap={"m"} flex={1}>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  gap={"m"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"auto"}
                >
                  <PropertyCategories
                    propertyCategories={property.categories}
                  />
                  <PropertyFeedbackSummary />
                </Box>
                <Box>
                  <Text color={"text"} variant={"titleLarge"}>
                    {property?.name}
                  </Text>
                  <Text color={"hintColor"}>{`${
                    property?.address?.ward ?? ""
                  } ${property?.address?.subCounty ?? ""}, ${
                    property?.address?.county ?? ""
                  }`}</Text>
                </Box>
                <TabView
                  routes={[
                    {
                      key: "about",
                      title: "About",
                      icon: (
                        <ExpoIconComponent
                          family="FontAwesome"
                          name="star"
                          color="red"
                        />
                      ),
                    },
                    {
                      key: "reviews",
                      title: "Reviews",
                      icon: (
                        <ExpoIconComponent
                          family="FontAwesome"
                          name="star"
                          color="red"
                        />
                      ),
                    },
                    {
                      key: "media",
                      title: "Media",
                      icon: (
                        <ExpoIconComponent
                          family="FontAwesome"
                          name="star"
                          color="red"
                          size={16}
                        />
                      ),
                    },
                    {
                      key: "relationships",
                      title: "Relatives",
                      icon: (
                        <ExpoIconComponent
                          family="FontAwesome"
                          name="star"
                          color="red"
                          size={16}
                        />
                      ),
                    },
                  ]}
                  scenes={{
                    about: () => <PropertyAbout property={property} />,
                    reviews: () => <PropertyReviews property={property} />,
                    media: () => <PropertyMediaWidget property={property} />,
                    relationships: () => (
                      <PropertyRelationships property={property} />
                    ),
                  }}
                  renderBadge={(route) => <Text>{route.title}</Text>}
                />
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({});
