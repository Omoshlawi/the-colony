import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
} from "@colony/core-components";
import { RoutePaths } from "../utils";
import { useRouter } from "expo-router";
import { useMyOrganizations } from "../hooks";
import { useSession } from "@colony/core-global";

const OrganizationContextTile = () => {
  const router = useRouter();
  const { currentOrganization } = useSession();
  const { isLoading, organizationsMemberships, error } = useMyOrganizations();

  if (isLoading) return <ListTileSkeleton />;
  const organization = organizationsMemberships.find(
    (memb) => memb.organization.id === currentOrganization
  );
  return (
    <ListTile
      title={organization ? organization.organization.name : "Individual"}
      subtitle="Tap to view switch scope"
      onPress={() => router.navigate(RoutePaths.MY_ORGANIZATIONS_SCREEN)}
      leading={
        <ExpoIconComponent family="SimpleLineIcons" name="organization" />
      }
      trailing={
        <ExpoIconComponent
          family="MaterialCommunityIcons"
          name="chevron-right"
        />
      }
    />
  );
};

export default OrganizationContextTile;

const styles = StyleSheet.create({});
