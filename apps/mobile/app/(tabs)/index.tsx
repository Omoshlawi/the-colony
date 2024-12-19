import {
  EmptyState,
  ErrorState,
  ExpoIcon,
  ListTileSkeleton,
  SeachableDropDown,
  Skeleton,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { InputSkeleton } from "@colony/core-components/src/components/StyledInput";
import { useSession } from "@colony/core-global";
import { useTheme } from "@colony/core-theme";
import { Redirect } from "expo-router";
import { useState } from "react";
import { LogBox, StyleSheet, View } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const { currentOrganization } = useSession();
  const them = useTheme();
  const [iconFamily, seticonFamily] = useState<string>();
  const [icon, setIcon] = useState<ExpoIcon>();

  if (currentOrganization) return <Redirect href={"/(tabs)/dashboard"} />;

  return (
    <StyledPageLayout>
      {/* <StyledText style={styles.title}>Welcome to Micro</StyledText> */}
      {/* <SeachableDropDown
        // data={Array.from({ length: 100 }).map((_, i) => ({
        //   label: i.toString(),
        //   value: i.toString(),
        // }))}
        asyncSearchFunction={async () => {
          return Array.from({ length: 100 }).map((_, i) => ({
            label: i.toString(),
            value: i.toString(),
          }));
        }}
        label="Test"
        initialValue={{ label: "1", value: "2" }}
        keyExtractor={({ value }) => value}
        multiple
        labelExtractor={({ label }) => label}
        maxSelections={2}
        valueExtractor={({ value }) => value}
        placeholderText="Seach..."
        onValueChange={(value) => {
          alert(JSON.stringify(value));
        }}
        onSelectItems={(value) => {
          alert(JSON.stringify(value));
        }}
      /> */}
      <InputSkeleton />
      <ListTileSkeleton />

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
