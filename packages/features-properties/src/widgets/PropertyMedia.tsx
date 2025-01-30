import { getHiveFileUrl } from "@colony/core-api";
import {
  ErrorState,
  ImageViewer,
  showModal,
  When,
} from "@colony/core-components";
import { Box, Text, useTheme } from "@colony/core-theme";
import React, { FC } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { usePropertyMedia } from "../hooks/useProperties";
import { Property, type PropertyMedia } from "../types";

type PropertyMediaProps = {
  property: Property;
};

const PropertyMediaWidget: FC<PropertyMediaProps> = ({ property }) => {
  const propertyMediaAsync = usePropertyMedia(property.id);
  const theme = useTheme();

  const handleShowImage = (propertyMedia: PropertyMedia) => {
    showModal(
      <Box width={"100%"} height={"100%"}>
        <ImageViewer
          source={getHiveFileUrl(propertyMedia.url)}
          style={styles.preview}
          contentFit="contain"
        />
        <Text
          variant={"bodyMedium"}
          color={"text"}
          textAlign={"center"}
          style={[
            {
              position: "absolute",
              bottom: theme.spacing.xl,
              flex: 1,
              width: "100%",
            },
          ]}
          p={"xl"}
        >
          {propertyMedia.description}
        </Text>
      </Box>
    );
  };
  return (
    <Box flex={1} pt={"s"}>
      <When
        asyncState={{
          ...propertyMediaAsync,
          data: propertyMediaAsync.propertyMedia,
        }}
        loading={() => <Text>Loading</Text>}
        error={(err) => <ErrorState error={err} />}
        success={(medias) => (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              alignItems: "center",
            }}
            data={medias}
            numColumns={3}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.img, { margin: theme.spacing.s }]}
                activeOpacity={0.5}
                onPress={() => handleShowImage(item)}
              >
                <ImageViewer
                  source={getHiveFileUrl(item.url)}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      />
    </Box>
  );
};

export default PropertyMediaWidget;

const styles = StyleSheet.create({
  img: {
    flexBasis: "29%", // Each item takes up one-third of the row width
    flexGrow: 1, // Allow items to grow uniformly
    aspectRatio: 1,
  },
  preview: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
