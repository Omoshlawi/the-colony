import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OrganizationProperties, Properties } from "../widgets";
import { PropertyForm } from "../forms";

const PropertiesScreen = () => {
  const data = useSession();

  const handleAddAmenity = () => {
    const dispose = showModal(<PropertyForm onSuccess={() => dispose()} />, {
      title: "Add Property",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Properties"
        actions={
          data?.currentOrganization && (
            <TouchableOpacity activeOpacity={0.5} onPress={handleAddAmenity}>
              <ExpoIconComponent family="Entypo" name="add-to-list" />
            </TouchableOpacity>
          )
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{ isLoading: false, data }}
          success={(session) => {
            if (session.currentOrganization) return <OrganizationProperties />;
            return <Properties />;
          }}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default PropertiesScreen;

const styles = StyleSheet.create({});
