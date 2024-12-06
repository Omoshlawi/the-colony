import { ScrollView, StyleSheet } from "react-native";

import {
  AppBar,
  ExpoIconComponent,
  ListTile,
  SectionCard,
  showSnackbar,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { ThemeTogglerSection } from "../widgets";
import { ExtensionSlot } from "@colony/core-extensions";

export const SettingsScreen = () => (
  <StyledPageLayout>
    <AppBar title="Settings" leading={false} />
    <ScrollView>
      <Box p={"m"} flex={1} flexDirection={"column"} gap={"m"}>
        <SectionCard title="Account">
          <ListTile
            title="Laurent Ouma"
            subtitle="lawiomosh3@gmail.com"
            leading={<ExpoIconComponent family="Feather" name="user" />}
            onPress={() => {}}
            trailing={
              <ExpoIconComponent
                family="MaterialCommunityIcons"
                name="chevron-right"
              />
            }
          />
          <ListTile
            title="Platven LTD"
            subtitle="Tap to change organization scope"
            leading={
              <ExpoIconComponent family="SimpleLineIcons" name="organization" />
            }
            trailing={
              <ExpoIconComponent
                family="MaterialCommunityIcons"
                name="chevron-right"
              />
            }
          />
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

const styles = StyleSheet.create({});
