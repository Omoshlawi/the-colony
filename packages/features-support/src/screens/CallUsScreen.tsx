import { StyleSheet } from "react-native";

import { ThemedPageLayout } from "@colony/core-components";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text } from "@colony/core-theme";

export const CallUsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Call Us",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <ThemedPageLayout>
      <Text style={styles.title}>All our agents are busy right now</Text>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
