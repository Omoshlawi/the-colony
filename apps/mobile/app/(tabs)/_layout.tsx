import { Tabs } from "expo-router";
import React from "react";

import { StyledTabBarIcon } from "@colony/core-components";
import { useTheme } from "@colony/core-theme";
import { SecureRoute } from "@colony/features-auth";
import { useSession } from "@colony/core-global";

export default function TabLayout() {
  const theme = useTheme();
  const { currentOrganization } = useSession();
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
          name="dashboard"
          options={{
            href: currentOrganization ? "/(tabs)/dashboard" : null,
            title: "Dashboard",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "view-dashboard" : "view-dashboard-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: currentOrganization ? null : "/(tabs)/dashboard",
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
            href: null,
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
            href: null,
            title: "Support",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "chat" : "chat-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <StyledTabBarIcon
                name={focused ? "cog" : "cog-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SecureRoute>
  );
}
