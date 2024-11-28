import { ThemeProvider } from "@colony/core-theme";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}