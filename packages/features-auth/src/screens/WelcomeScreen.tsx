import { Logo, StyledButton, StyledPageLayout } from "@colony/core-components";
import { useUserPreferences } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { WelcomeHeader } from "../widgets";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <StyledPageLayout withSafeArea={true}>
      <View style={styles.container}>
        <View />
        <Logo size={200} />
        <View>
          <Text
            variant={"titleLarge"}
            color={"text"}
            textAlign={"center"}
            fontWeight={"700"}
            pb={"m"}
          >
            Get started
          </Text>
          <StyledButton title="Login" variant="filled" />
          <StyledButton title="Register" variant="outline" />
        </View>
        <View />
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
    justifyContent: "space-around",
    alignItems: "center",
  },
});
