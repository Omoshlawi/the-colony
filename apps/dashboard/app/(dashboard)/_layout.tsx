import { Stack } from "expo-router";
import React from "react";

const DashboardLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="attribute-types" />
      <Stack.Screen name="amenities" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="relationship-types" />
    </Stack>
  );
};

export default DashboardLayout;
