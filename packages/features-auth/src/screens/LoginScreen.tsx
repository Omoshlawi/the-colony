import { StyleSheet } from "react-native";

import { AppBar, Logo, StyledPageLayout } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { LoginForm } from "../forms";

export const LoginScreen = () => {
  return (
    <StyledPageLayout>
      <AppBar title={"Login"} />

      <Box
        padding={"m"}
        flex={1}
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"center"}
        gap={"m"}
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
