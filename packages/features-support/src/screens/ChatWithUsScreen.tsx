import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

import { StyledPageLayout } from "@colony/core-components";
import { useEffect } from "react";
import { Text } from "@colony/core-theme";

export const ChatWithUsScreen = () => {
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
      <Text style={styles.title}>All our agents are busy right now</Text>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
