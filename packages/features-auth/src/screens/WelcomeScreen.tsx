import { Logo, Button, StyledPageLayout } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RoutePaths } from "../utils";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <StyledPageLayout withSafeArea={true}>
      <Box flex={1} flexDirection={"column"} justifyContent={"center"}>
        <ScrollView style={{ flexGrow: 0 }}>
          <Box flexDirection={"column"} alignItems={"center"} gap={"xl"}>
            <Logo size={200} />
            <Box gap={"l"} p={"m"}>
              <Text
                variant={"titleLarge"}
                color={"text"}
                textAlign={"center"}
                fontWeight={"700"}
                pb={"m"}
              >
                Get started
              </Text>
              <Button
                title="Login"
                variant="primary"
                onPress={() => router.navigate(RoutePaths.LOGIN_SCREEN)}
              />
              <Button
                title="Register"
                variant="tertiary"
                onPress={() => router.navigate(RoutePaths.REGISTER_SCREEN)}
              />
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </StyledPageLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
