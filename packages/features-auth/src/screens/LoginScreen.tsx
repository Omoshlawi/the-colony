import { StyleSheet, Switch, View } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { LoginForm } from "../forms";
import { useUserPreferences } from "@colony/core-global";

export const LoginScreen = () => {
  const navigation = useNavigation();

  const {
    userPreferences: { theme },
    setTheme,
  } = useUserPreferences();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Login",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <StyledPageLayout>
      <View>
        <Box
          padding="xl"
          margin="xl"
          borderRadius={"medium"}
          backgroundColor={"background"}
        >
          <Text color={"text"} variant={"labelLarge"}>
            themed text here
          </Text>
        </Box>
        <Switch
          value={theme === "dark"}
          onValueChange={(enabled) => setTheme(enabled ? "dark" : "light")}
        />
        <StyledText
          style={styles.title}
          type="caption"
        >{`login screen`}</StyledText>
        <LoginForm />
      </View>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    textDecorationColor: "",
    fontSize: 100,
    fontWeight: "400",
  },
});
