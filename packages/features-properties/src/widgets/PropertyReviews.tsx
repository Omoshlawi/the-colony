import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
import { Box } from "@colony/core-theme";
import { EmptyState } from "@colony/core-components";
type PropertyReviewsProps = {
  property: Property;
};

const PropertyReviews: FC<PropertyReviewsProps> = ({ property }) => {
  return (
    <Box flex={1}>
      <EmptyState message="No reviews for this property" />
    </Box>
  );
};

export default PropertyReviews;

const styles = StyleSheet.create({});
