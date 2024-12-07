import { FlatList, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import { useMyOrganizations } from "../hooks";
import { OrganizationForm } from "../forms";
import {
  ExpoIconComponent,
  ListTile,
  showModal,
} from "@colony/core-components";
import { Organization } from "../types";
import { useSession } from "@colony/core-global";

export const MyOrganizations = () => {
  const { currentOrganization } = useSession();
  const { organizationsMemberships, error, isLoading } = useMyOrganizations();
  const handleUpdate = (organization: Organization) => {
    const dispose = showModal(
      <OrganizationForm
        organization={organization}
        onSuccess={() => dispose()}
      />,
      { title: "Update amenity" }
    );
  };
  return (
    <FlatList
      style={styles.scrollable}
      data={organizationsMemberships}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListTile
          // onPress={() => handleLaunchBottomsheet(item)}
          title={item.organization?.name}
          subtitle={item.organization?.description}
          leading={
            <ExpoIconComponent
              family="SimpleLineIcons"
              name="organization"
              size={24}
            />
          }
          trailing={
            <Switch
              value={currentOrganization === item.organizationId}
              disabled
            />
          }
          borderBottom
        />
      )}
    />
  );
};

const styles = StyleSheet.create({ scrollable: { flex: 1 } });
