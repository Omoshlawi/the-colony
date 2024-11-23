import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { OpenRoute, WelcomeScreen } from "@colony/features-auth";

const Welcome = () => {
  return (
    <OpenRoute>
      <WelcomeScreen />
    </OpenRoute>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
