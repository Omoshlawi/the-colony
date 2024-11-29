import { Stack } from "expo-router/stack";
import { ThemeProvider } from "@colony/core-theme";
import { StatusBar } from "expo-status-bar";
import { useUserPreferences } from "@colony/core-global";
import { ApiConfigProvider } from "@colony/core-api";

export default function Layout() {
  const {
    userPreferences: { theme },
  } = useUserPreferences();
  return (
    <ThemeProvider>
      <ApiConfigProvider>
        <StatusBar style={theme == "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </ApiConfigProvider>
    </ThemeProvider>
  );
}
