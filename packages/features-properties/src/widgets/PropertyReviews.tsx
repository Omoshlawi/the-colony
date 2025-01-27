import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property } from "../types";
type PropertyReviewsProps = {
  property: Property;
};

const PropertyReviews:FC<PropertyReviewsProps> = ({property}) => {
  return (
    <View>
      <Text>PropertyReviews</Text>
    </View>
  );
};

export default PropertyReviews;

const styles = StyleSheet.create({});
