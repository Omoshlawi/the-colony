import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAmenities } from "../hooks";
import { SkeletonLoader } from "@colony/core-components";

const Amenities = () => {
  const { amenities, error, isLoading } = useAmenities();
  if (true) {
    return <SkeletonLoader />;
  }
  return (
    <View>
      <Text>Amenities</Text>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({});
