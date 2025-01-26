import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { PropertyCategory } from "../types";
import { Box, Color, Text, useTheme } from "@colony/core-theme";

type PropertyCategoriesProps = {
  propertyCategories?: PropertyCategory[];
};
const PropertyCategories: FC<PropertyCategoriesProps> = ({
  propertyCategories = [],
}) => {
  const theme = useTheme();
  return (
    <Box flexDirection={"row"} flexGrow={0} alignItems={"center"} gap={"s"}>
      {propertyCategories.map((category) => (
        <Box
          key={category.id}
          p={"s"}
          borderRadius={"medium"}
          flexDirection={"row"}
          flexGrow={0}
          style={{
            backgroundColor: Color(theme.colors.primary).alpha(0.1).toString(),
          }}
        >
          <Text color={"primary"} variant={"labelMedium"}>
            {category.category?.name}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default PropertyCategories;

const styles = StyleSheet.create({});
