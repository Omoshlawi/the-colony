import { AppBar, StyledPageLayout, When } from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import React from "react";
import { StyleSheet } from "react-native";
import { OrganizationProperties, Properties } from "../widgets";

const PropertiesScreen = () => {
  const data = useSession();
  return (
    <StyledPageLayout>
      <AppBar title="Properties" />
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
