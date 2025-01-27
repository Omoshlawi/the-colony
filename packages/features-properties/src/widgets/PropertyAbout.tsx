import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
import { Box, Text, useTheme } from "@colony/core-theme";
import { ExpoIcon, ExpoIconComponent } from "@colony/core-components";

type PropertyAboutProps = {
  property: Property;
};

const PropertyAbout: FC<PropertyAboutProps> = ({ property }) => {
  const theme = useTheme();
  return (
    <Box gap={"m"} paddingVertical={"m"}>
      <Box flexDirection={"row"} gap={"s"} alignItems={"center"}>
        {property.attributes?.map((attr) => (
          <Box
            key={attr.id}
            p={"s"}
            borderRadius={"medium"}
            flexDirection={"row"}
            gap={"s"}
            // style={{ backgroundColor: theme.colors.hintColor }}
          >
            {attr.attribute && (
              <ExpoIconComponent
                {...(attr.attribute!.icon as ExpoIcon)}
                size={18}
                color={theme.colors.primary}
              />
            )}
            <Text color={"text"} fontWeight={"700"} variant={"bodySmall"}>
              {attr.value} {attr.attribute?.name}
            </Text>
          </Box>
        ))}
      </Box>
      {property.description && (
        <Box gap={"s"}>
          <Text fontWeight={"700"} color={"text"}>
            Description
          </Text>
          <Text color={"hintColor"}>{property?.description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default PropertyAbout;

const styles = StyleSheet.create({});
