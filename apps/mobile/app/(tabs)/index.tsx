import {
  ExpoIconPicker,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { AccountWidget } from "@colony/features-accounts";
import { UpcomingPaymentWidget } from "@colony/features-payments";
import { LogBox, StyleSheet } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Welcome to Micro</StyledText>
      <ExpoIconPicker />
      {/* <AccountWidget />
      <UpcomingPaymentWidget /> */}
    </StyledPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
