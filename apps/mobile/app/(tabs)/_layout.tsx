import { Tabs } from "expo-router";
import React from "react";

import { StyledTabBarIcon } from "@colony/core-components";
import { useTheme } from "@colony/core-theme";
import { SecureRoute } from "@colony/features-auth";

export default function TabLayout() {
  const theme = useTheme();
  return (
    <SecureRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="pay"
          options={{
            title: "Pay",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "plus-circle" : "plus-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="support"
          options={{
            title: "Support",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "chat" : "chat-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SecureRoute>
  );
}
