import { StyleSheet } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { LoginForm } from "../forms";

export const LoginScreen = () => {
  const navigation = useNavigation();
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Login",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>login screen</StyledText>
      <LoginForm/>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
