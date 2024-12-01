import { ApiConfigProvider } from "@colony/core-api";
import { OverlayPortal } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { ThemeProvider } from "@colony/core-theme";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Layout() {
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
            <Stack.Screen name="(support)/call-us" />
            <Stack.Screen name="(support)/chat-with-us" />
          </Stack>
        </OverlayPortal>
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
