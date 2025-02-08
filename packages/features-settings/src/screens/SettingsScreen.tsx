import { ScrollView, StyleSheet } from "react-native";

import {
  AppBar,
  ExpoIconComponent,
  ListTile,
  SectionCard,
  StyledPageLayout
} from "@colony/core-components";
import { ExtensionSlot } from "@colony/core-extensions";
import { useSession } from "@colony/core-global";
import { Box } from "@colony/core-theme";
import { useRouter } from "expo-router";
import { OrganizationContextTile, ThemeTogglerSection } from "../widgets";

export const SettingsScreen = () => {
  const { user } = useSession();
  const router = useRouter();
  return (
    <StyledPageLayout>
      <AppBar title="Settings" leading={false} />
      <ScrollView>
        <Box p={"m"} flex={1} flexDirection={"column"} gap={"m"}>
          <SectionCard title="Account">
            <ListTile
              title={user?.person.name ?? user?.username}
              subtitle={user?.person?.email}
              leading={<ExpoIconComponent family="Feather" name="user" />}
              onPress={() => {}}
              trailing={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="chevron-right"
                />
              }
            />
            <OrganizationContextTile />
            <ListTile
              title="Change password"
              leading={<ExpoIconComponent family="Feather" name="key" />}
              subtitle="Use string secure password"
              trailing={
                <ExpoIconComponent
                  family="MaterialCommunityIcons"
                  name="chevron-right"
                />
              }
            />
          </SectionCard>
          <ThemeTogglerSection />
          <ExtensionSlot name="logout-slot" />
        </Box>
      </ScrollView>
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({});
