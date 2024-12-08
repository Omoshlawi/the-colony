import {
  ExpoIcon,
  ExpoIconPicker,
  getExpoIconFamiliesNames,
  getExpoIcons,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { AccountWidget } from "@colony/features-accounts";
import { UpcomingPaymentWidget } from "@colony/features-payments";
import { Redirect } from "expo-router";
import { useState } from "react";
import { LogBox, StyleSheet } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const { currentOrganization } = useSession();

  const [iconFamily, seticonFamily] = useState<string>();
  const [icon, setIcon] = useState<ExpoIcon>();

  if (currentOrganization) return <Redirect href={"/(tabs)/dashboard"} />;

  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Welcome to Micro</StyledText>
      <ExpoIconPicker
        onSearchIcon={async (search, category) => {
          return getExpoIcons([category as any]).filter((icon) =>
            icon.name.toLowerCase().includes(search?.toLowerCase() ?? "")
          );
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
