import { LogBox, StyleSheet } from "react-native";

import { StyledPageLayout, StyledText } from "@colony/core-components";
import { AccountWidget } from "@colony/features-accounts";
import { UpcomingPaymentWidget } from "@colony/features-payments";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Welcome to Micro</StyledText>
      <AccountWidget />
      <UpcomingPaymentWidget />
    </StyledPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
