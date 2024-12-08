import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DashboardsScreen } from "@colony/features-dashboard";
import { useSession } from "@colony/core-global";
import { Redirect } from "expo-router";

const Dashboard = () => {
  const { currentOrganization } = useSession();

  if (!currentOrganization) return <Redirect href={"/(tabs)"} />;

  return <DashboardsScreen />;
};

export default Dashboard;

const styles = StyleSheet.create({});
