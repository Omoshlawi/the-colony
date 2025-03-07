import { StyleSheet, Text } from "react-native";

import { ThemedPageLayout } from "@colony/core-components";
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
    <ThemedPageLayout>
      <Text style={styles.title}>Send a payment</Text>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
