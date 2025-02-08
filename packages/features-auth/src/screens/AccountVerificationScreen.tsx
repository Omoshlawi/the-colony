import { useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { StyledPageLayout } from "@colony/core-components";
import { useEffect } from "react";

export const AccountVerificationScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Chat with Us",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <Text style={styles.title}>Account verifications screen</Text>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
