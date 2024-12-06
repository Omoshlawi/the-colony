import {
  ExpoIconComponent,
  ListTile,
  SectionCard,
  showDialog,
  showSnackbar,
  StyledButton,
} from "@colony/core-components";
import React from "react";
import { useAuthAPi } from "../hooks";
import { Box, Text } from "@colony/core-theme";
import { View } from "react-native";

export const LogoutSection = () => {
  const { logoutUser } = useAuthAPi();
  const handleLogout = () => {
    showSnackbar({
      title: "Hello",
      subtitle: "Description",
      options: { timeout: 5000 },
    });

    return;
    const dispose = showDialog(
      <Box
        gap={"m"}
        p={"m"}
        flexDirection={"column"}
        style={{ display: "flex", gap: 20 }}
      >
        <Box>
          <Text variant={"titleSmall"} color={"text"}>
            Logout
          </Text>
          <Text variant={"bodyMedium"} color={"text"} mt={"m"}>
            Are you sure you want to logout
          </Text>
        </Box>
        <Box
          flex={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={"m"}
          marginVertical={"l"}
        >
          <Box flex={1}>
            <StyledButton
              title="Yes"
              onPress={() => {
                dispose();
                logoutUser();
              }}
            />
          </Box>
          <Box flex={1}>
            <StyledButton
              title="No"
              variant="outline"
              onPress={() => dispose()}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <SectionCard>
      <ListTile
        leading={<ExpoIconComponent family="AntDesign" name="logout" />}
        title="logout"
        subtitle="End current session"
        onPress={handleLogout}
        trailing={
          <ExpoIconComponent
            family="MaterialCommunityIcons"
            name="chevron-right"
          />
        }
      />
    </SectionCard>
  );
};
