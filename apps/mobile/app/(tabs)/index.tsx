import {
  ExpoIcon,
  ExpoIconPicker,
  getExpoIconFamiliesNames,
  getExpoIcons,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { AccountWidget } from "@colony/features-accounts";
import { UpcomingPaymentWidget } from "@colony/features-payments";
import { useState } from "react";
import { LogBox, StyleSheet } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const [iconFamily, seticonFamily] = useState<string>();
  const [icon, setIcon] = useState<ExpoIcon>();
  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Welcome to Micro</StyledText>
      <ExpoIconPicker
        onSearchIcon={async (search, category) => {
          return getExpoIcons([category as any]);
        }}
        getIconFamilies={async () => getExpoIconFamiliesNames()}
        selectedIconFamily={iconFamily}
        onSelectIconFamily={seticonFamily}
        onSelectIcon={setIcon}
        selectedIcon={icon}
      />
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
