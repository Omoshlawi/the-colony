import { ThemeProvider } from "@colony/core-theme";
import {
  registerExtensions,
  useLoadInitialAuthState,
} from "@colony/features-auth";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApiConfigProvider } from "@colony/core-api";
import { OverlayPortal } from "@colony/core-components";
import { StatusBar } from "expo-status-bar";
import { useUserPreferences } from "@colony/core-global";
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset and auth state loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  const { isLoading } = useLoadInitialAuthState();

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  useEffect(() => {
    registerExtensions();
  }, []);

  if (!loaded || isLoading) {
    return null;
  }

  return (
    <ThemeProvider>
      <ApiConfigProvider>
        <OverlayPortal>
          <StatusBar style={theme == "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(authentication)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </OverlayPortal>
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
