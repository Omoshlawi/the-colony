import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
import { ImageViewer } from "@colony/core-components";
import { Color } from "@colony/core-theme";
import { useUserPreferedTheme } from "@colony/core-global";
import { getHiveFileUrl } from "@colony/core-api";

type PropertyDetailHeaderProps = {
  property: Property;
};

const PropertyDetailHeader: FC<PropertyDetailHeaderProps> = ({ property }) => {
  const theme = useUserPreferedTheme();
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
            backgroundColor: Color(theme === "dark" ? "black" : "white")
              .alpha(0.5)
              .toString(),
          },
        ]}
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
