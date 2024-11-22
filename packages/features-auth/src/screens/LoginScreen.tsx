import { StyleSheet, Switch, View } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
import { Box, Text, useTheme } from "@colony/core-theme";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { LoginForm } from "../forms";
import { useUserPreferences } from "@colony/core-global";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    colors: { background, text },
  } = useTheme();

  const {
    userPreferences: { theme },
    setTheme,
  } = useUserPreferences();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Login",
      headerBackTitleVisible: false,
      headerTintColor: text,
      headerStyle: {
        backgroundColor: background,
      },
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <Box padding={"m"}>
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
