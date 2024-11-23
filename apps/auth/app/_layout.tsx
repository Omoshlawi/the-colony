import { Stack } from "expo-router/stack";
import { ThemeProvider } from "@colony/core-theme";
import { StatusBar } from "expo-status-bar";
import { useUserPreferences } from "@colony/core-global";

export default function Layout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ThemeProvider>
      <StatusBar style={theme == "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}
