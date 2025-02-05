import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PropertiesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[propertyId]" />
    </Stack>
  );
};

export default PropertiesLayout;
