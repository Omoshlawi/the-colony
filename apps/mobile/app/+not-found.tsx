import { StyledText } from "@colony/core-components";
import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <StyledText type="bold">This screen doesn't exist.</StyledText>
        <Link href="/" style={styles.link}>
          <StyledText>Go to home screen!</StyledText>
        </Link>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
