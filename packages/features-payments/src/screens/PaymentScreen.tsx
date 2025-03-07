import { StyleSheet, Text } from "react-native";

import { ThemedPageLayout } from "@colony/core-components";
import { PayWidget } from "../widgets";

export const PaymentScreen = () => (
  <ThemedPageLayout>
    <Text style={styles.title}>Payments</Text>
    <PayWidget />
  </ThemedPageLayout>
);

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
