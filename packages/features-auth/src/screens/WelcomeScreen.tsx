import { Logo, StyledButton, StyledPageLayout } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RoutePaths } from "../utils";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <StyledPageLayout withSafeArea={true}>
      <View style={styles.container}>
        <View />
        <Logo size={200} />
        <Box gap={"l"} p={"m"}>
          <Text
            variant={"titleLarge"}
            color={"text"}
            textAlign={"center"}
            fontWeight={"700"}
            pb={"m"}
          >
            Get started
          </Text>
          <StyledButton
            title="Login"
            variant="filled"
            onPress={() => router.navigate(RoutePaths.LOGIN_SCREEN)}
          />
          <StyledButton
            title="Register"
            variant="outline"
            onPress={() => router.navigate(RoutePaths.REGISTER_SCREEN)}
          />
        </Box>
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
