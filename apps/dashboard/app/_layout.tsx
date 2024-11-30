import { ApiConfigProvider } from "@colony/core-api";
import { ThemeProvider } from "@colony/core-theme";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <ApiConfigProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
      </ThemeProvider>
    </ApiConfigProvider>
  );
}
