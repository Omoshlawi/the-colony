import { Stack } from "expo-router";
import React from "react";

const DashboardLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="properties" />
    </Stack>
  );
};

export default DashboardLayout;
