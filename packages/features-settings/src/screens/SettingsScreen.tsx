import { StyleSheet } from "react-native";

import {
  AppBar,
  ExpoIconComponent,
  ListTile,
  SectionCard,
  StyledPageLayout,
  StyledText,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { ThemeTogglerSection } from "../widgets";

export const SettingsScreen = () => (
  <StyledPageLayout>
    <AppBar title="Settings" leading={false} />
    <Box p={"m"} flex={1} flexDirection={"column"} gap={"m"}>
      <SectionCard title="Account">
        <ListTile
          title="User"
          subtitle="subtitle"
          trailing={
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name="chevron-right"
            />
          }
        />
        <ListTile
          title="User"
          subtitle="subtitle"
          trailing={
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name="chevron-right"
            />
          }
        />
      </SectionCard>
      <ThemeTogglerSection />
    </Box>
  </StyledPageLayout>
);

const styles = StyleSheet.create({});
