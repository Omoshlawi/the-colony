import { Stack } from "expo-router";
import { ApiConfigProvider } from "@colony/core-api";
import { OverlayPortal } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { ThemeProvider } from "@colony/core-theme";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ApiConfigProvider>
      <ThemeProvider>
        <OverlayPortal>
          <StatusBar style={theme == "dark" ? "light" : "dark"} />

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(listings)" />
            <Stack.Screen name="index" />
          </Stack>
        </OverlayPortal>
      </ThemeProvider>
    </ApiConfigProvider>
  );
}
