import { ScrollView, StyleSheet } from "react-native";
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
    <Box flexDirection={"row"} flex={2} alignItems={"center"}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {propertyCategories.map((category) => (
          <Box
            key={category.id}
            p={"s"}
            borderRadius={"medium"}
            flexDirection={"row"}
            flexGrow={0}
            style={{
              backgroundColor: Color(theme.colors.primary)
                .alpha(0.1)
                .toString(),
            }}
            mr={"s"}
          >
            <Text color={"primary"} variant={"labelMedium"}>
              {category.category?.name}
            </Text>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};

export default PropertyCategories;

const styles = StyleSheet.create({});
