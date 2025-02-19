import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMyOrganizationApi, useMyOrganizations } from "../hooks";
import { OrganizationForm } from "../forms";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  showModal,
  showModalBottomSheet,
  showSnackbar,
  Button,
} from "@colony/core-components";
import { Organization } from "../types";
import { useSession } from "@colony/core-global";
import { Box } from "@colony/core-theme";
import { handleApiErrors } from "@colony/core-api";

export const MyOrganizations = () => {
  const { currentOrganization } = useSession();
  const { organizationsMemberships, error, isLoading } = useMyOrganizations();
  const { swichOrganization, exitContext } = useMyOrganizationApi();
  const [loading, setLoading] = useState(false);
  const handleUpdate = (organization: Organization) => {
    const dispose = showModal(
      <OrganizationForm
        organization={organization}
        onSuccess={() => dispose()}
      />,
      { title: "Update amenity" }
    );
  };
  const handleSwitch = async (organization: Organization) => {
    setLoading(true);
    try {
      await swichOrganization(organization.id);
      showSnackbar({
        kind: "success",
        title: "success",
        subtitle: "Succesfully switched to " + organization.name,
      });
    } catch (error: any) {
      showSnackbar({
        kind: "error",
        title: "error",
        subtitle: error?.response?.data?.detail ?? error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleQuite = async (organization: Organization) => {
    setLoading(true);
    try {
      await exitContext();
      showSnackbar({
        kind: "success",
        title: "success",
        subtitle: "Succesfully quit " + organization.name + " context",
      });
    } catch (error: any) {
      showSnackbar({
        kind: "error",
        title: "error",
        subtitle: error?.response?.data?.detail ?? error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleLaunchBottomsheet = (org: Organization) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <Button
            title="Set to current context"
            variant="primary"
            onPress={async () => {
              dispose();
              await handleSwitch(org);
            }}
          />
          {org.id === currentOrganization && (
            <Button
              title="Quite organization context"
              variant="primary"
              onPress={async () => {
                dispose();
                await handleQuite(org);
              }}
            />
          )}
          <Button
            title="Update"
            variant="tertiary"
            onPress={() => {
              dispose();
              handleUpdate(org);
            }}
          />

          <Button
            title="Delete"
            variant="tertiary"
            onPress={() => {
              dispose();
              handleUpdate;
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${org.name} actions` }
    );
  };

  if (error)
    return (
      <ErrorState
        message={`${error?.message}`}
        detail={handleApiErrors(error)?.detail}
      />
    );

  if (!organizationsMemberships.length)
    return <EmptyState message="No organizations" />;

  return (
    <FlatList
      style={styles.scrollable}
      data={organizationsMemberships}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListTile
          onPress={() => handleLaunchBottomsheet(item.organization)}
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
