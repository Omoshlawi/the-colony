import { ThemedPageLayout } from "@colony/core-components";
import { StyleSheet } from "react-native";

import { ContactUsWidget } from "../widgets";
import { Text } from "@colony/core-theme";

export const SupportScreen = () => {
  return (
    <ThemedPageLayout>
      <Text style={styles.title}>Support</Text>
      <ContactUsWidget />
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
