import { ApiConfigProvider } from "@colony/core-api";
import { OverlayPortal } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { ThemeProvider } from "@colony/core-theme";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ApiConfigProvider>
      <ThemeProvider>
        <OverlayPortal>
          <StatusBar style={theme == "dark" ? "light" : "dark"} />

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(properties)" />
          </Stack>
        </OverlayPortal>
      </ThemeProvider>
    </ApiConfigProvider>
  );
}
