import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useCallback } from "react";
import { Property } from "../types";
import {
  AppBar,
  Button,
  ExpoConstants,
  ExpoIconComponent,
  IconButton,
  ImageViewer,
  showModalBottomSheet,
} from "@colony/core-components";
import { Box, Color, useTheme } from "@colony/core-theme";
import { useUserPreferedTheme } from "@colony/core-global";
import { getHiveFileUrl } from "@colony/core-api";
import { useRouter } from "expo-router";
import PropertyActions from "./PropertyActions";
type PropertyDetailHeaderProps = {
  property: Property;
};

const PropertyDetailHeader: FC<PropertyDetailHeaderProps> = ({ property }) => {
  const cuurThem = useUserPreferedTheme();
  const theme = useTheme();
  const router = useRouter();

  const launchActionsBottomSheet = useCallback(() => {
    const dispose = showModalBottomSheet(
      <PropertyActions onAction={() => dispose()} property={property} />,
      {
        title: "Actions",
        height: "auto",
      }
    );
  }, []);

  return (
    <View style={[styles.header]}>
      <ImageViewer
        source={getHiveFileUrl(property.thumbnail)}
        style={styles.bg}
      />
      <View
        style={[
          styles.bg,
          {
            backgroundColor: Color(cuurThem === "dark" ? "black" : "white")
              .alpha(0.5)
              .toString(),
          },
        ]}
      />
      <ExpoConstants
        renderComponent={(constants) => (
          <Box
            flexDirection={"row"}
            position={"absolute"}
            top={constants.statusBarHeight}
            width={"100%"}
            flex={1}
            paddingHorizontal={"m"}
            gap={"s"}
            alignItems={"center"}
          >
            <IconButton
              icon={{
                family: "MaterialCommunityIcons",
                name: "keyboard-backspace",
              }}
              onPress={router.back}
              variant="tonal"
            />
            <View style={{ flex: 1 }} />
            <IconButton
              icon={{
                family: "MaterialCommunityIcons",
                name: "share-variant",
              }}
              onPress={router.back}
              variant="tonal"
            />
            <IconButton
              icon={{
                family: "MaterialIcons",
                name: "favorite-outline",
              }}
              onPress={router.back}
              variant="tonal"
            />
            <IconButton
              icon={{
                family: "MaterialIcons",
                name: "edit",
              }}
              onPress={launchActionsBottomSheet}
              variant="tonal"
            />
          </Box>
        )}
      />
      <Box
        flexDirection={"row"}
        gap={"s"}
        style={[
          styles.thumbnails,
          {
            bottom: theme.spacing.m,
            backgroundColor: Color(theme.colors.primary)
              .lighten(0.7)
              .toString(),
          },
        ]}
        flexGrow={0}
        alignSelf={"center"}
        padding={"s"}
        borderRadius={"medium"}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <TouchableOpacity key={index} activeOpacity={0.5}>
            <ImageViewer
              source={getHiveFileUrl(property.thumbnail)}
              style={[
                styles.thumbnail,
                { borderRadius: theme.borderRadii.small },
              ]}
            />
          </TouchableOpacity>
        ))}
      </Box>
    </View>
  );
};

export default PropertyDetailHeader;

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
  thumbnails: {
    position: "absolute",
  },
  thumbnail: {
    height: 50,
    width: 50,
  },
});
