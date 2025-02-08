import { StyleSheet, Text } from "react-native";

import { StyledPageLayout } from "@colony/core-components";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const PayScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Send money",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <Text style={styles.title}>Send a payment</Text>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
