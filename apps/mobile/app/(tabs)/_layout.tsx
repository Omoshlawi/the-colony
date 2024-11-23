import { Redirect, Tabs } from "expo-router";
import React from "react";
import { RoutePaths } from "@colony/features-auth";

import { microColors, StyledTabBarIcon } from "@colony/core-components";
import { useSession } from "@colony/core-global";

export default function TabLayout() {
  const { isAuthenticated } = useSession();
  if (!isAuthenticated)
    return <Redirect href={RoutePaths.LOGIN_SCREEN as any} />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: microColors.blue,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <StyledTabBarIcon
              name={focused ? "home-outline" : "home-outline"}
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
  );
}
