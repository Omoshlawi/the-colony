import { Stack } from "expo-router";
import { ApiConfigProvider } from "@colony/core-api";
import { OverlayPortal } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { ThemeProvider } from "@colony/core-theme";
import { StatusBar } from "expo-status-bar";
import React from "react";
import 'react-native-reanimated';

export default function RootLayout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ThemeProvider>
      <ApiConfigProvider>
        <OverlayPortal>
          <StatusBar style={theme == "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="(settings)" />
          </Stack>
        </OverlayPortal>
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
