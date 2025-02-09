import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useUserPreferences,
  ApiConfigProvider,
  ThemeProvider,
} from "@colony/framework";
import "react-native-reanimated";

export default function RootLayout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ApiConfigProvider>
      <ThemeProvider>
        {/* <OverlayPortal> */}
        <StatusBar style={theme == "dark" ? "light" : "dark"} />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        {/* </OverlayPortal> */}
      </ThemeProvider>
    </ApiConfigProvider>
  );
}
