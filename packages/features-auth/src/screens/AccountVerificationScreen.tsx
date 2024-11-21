import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
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
      <StyledText style={styles.title}>Account verifications screen</StyledText>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
