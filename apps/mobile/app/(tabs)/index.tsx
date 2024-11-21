import { LogBox, StyleSheet } from "react-native";
import { Text } from "react-native";
import { StyledPageLayout, StyledText } from "@colony/core-components";
import { AccountWidget } from "@colony/features-accounts";
import { UpcomingPaymentWidget } from "@colony/features-payments";
import { useSession } from "@colony/core-global";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const session = useSession();
  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Welcome to Micro</StyledText>
      <Text>{JSON.stringify(session, null, 2)}</Text>
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
