import { StyleSheet, Text } from "react-native";

import { StyledPageLayout } from "@colony/core-components";
import { PayWidget } from "../widgets";

export const PaymentScreen = () => (
  <StyledPageLayout>
    <Text style={styles.title}>Payments</Text>
    <PayWidget />
  </StyledPageLayout>
);

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
