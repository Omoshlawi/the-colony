import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="my-organizations" />
    </Stack>
  );
};

export default SettingsLayout;

const styles = StyleSheet.create({});
