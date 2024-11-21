import { StyleSheet } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Call Us",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>login screen</StyledText>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
