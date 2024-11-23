import { OpenRoute } from "@colony/features-auth";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <OpenRoute>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </OpenRoute>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
