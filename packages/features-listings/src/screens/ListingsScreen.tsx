import { AppBar, ThemedPageLayout } from "@colony/core-components";
import React from "react";
import { StyleSheet } from "react-native";
import { Listings, OrganizationListings } from "../widgets";
import { useSession } from "@colony/core-global";

const ListingsScreen = () => {
  const { currentOrganization } = useSession();
  if (currentOrganization) return <OrganizationListings />;
  return <Listings />;
};

export default ListingsScreen;

const styles = StyleSheet.create({});
