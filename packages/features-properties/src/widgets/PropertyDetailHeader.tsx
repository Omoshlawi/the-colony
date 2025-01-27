import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
import {
  AppBar,
  ExpoConstants,
  ExpoIconComponent,
  IconButton,
  ImageViewer,
} from "@colony/core-components";
import { Box, Color, useTheme } from "@colony/core-theme";
import { useUserPreferedTheme } from "@colony/core-global";
import { getHiveFileUrl } from "@colony/core-api";
import { useRouter } from "expo-router";
type PropertyDetailHeaderProps = {
  property: Property;
};

const PropertyDetailHeader: FC<PropertyDetailHeaderProps> = ({ property }) => {
  const cuurThem = useUserPreferedTheme();
  const theme = useTheme();
  const router = useRouter();
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
            gap={"m"}
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
          </Box>
        )}
      />
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
});
