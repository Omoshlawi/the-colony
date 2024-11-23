import { AppBar, Logo, StyledPageLayout } from "@colony/core-components";
import { ScrollView, StyleSheet } from "react-native";

import { Box, Text } from "@colony/core-theme";
import { RegisterForm } from "../forms";
import { createRef } from "react";

export const RegistrationScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title={"Register"} />
      <Box flexDirection={"column"} flex={1} justifyContent={"center"}>
        <ScrollView style={{ flexGrow: 0 }}>
          <Box
            padding={"m"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"center"}
            gap={"m"}
            mb={"l"}
          >
            <Logo size={150} />
            <Text
              color={"text"}
              variant={"headlineLarge"}
              fontWeight={"700"}
              textAlign={"center"}
            >
              Sign Up
            </Text>
            <RegisterForm />
          </Box>
        </ScrollView>
      </Box>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
