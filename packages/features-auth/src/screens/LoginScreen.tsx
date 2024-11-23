import { ScrollView, StyleSheet } from "react-native";

import { AppBar, Logo, StyledPageLayout } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { LoginForm } from "../forms";

export const LoginScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title={"Login"} />

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
              Sign In
            </Text>
            <LoginForm />
          </Box>
        </ScrollView>
      </Box>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    textDecorationColor: "",
    fontSize: 100,
    fontWeight: "400",
  },
});
