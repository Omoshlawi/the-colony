import { StyledPageLayout } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <StyledPageLayout withSafeArea={true}>
      <View style={styles.container}>
        <Text variant={"titleLarge"} color={"text"} textAlign={"center"}>
          Welcome to
        </Text>
        <Text variant={"headlineLarge"} color={"text"} textAlign={"center"}>
          The Collony
        </Text>
      </View>
    </StyledPageLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
