import { Stack } from "expo-router/stack";
import { ThemeProvider } from "@colony/core-theme";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />;
    </ThemeProvider>
  );
}
