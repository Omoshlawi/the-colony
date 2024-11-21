import { StyledPageLayout, StyledText } from "@colony/core-components";
import { StyleSheet } from "react-native";

import { ContactUsWidget } from "../widgets";

export const RegistrationScreen = () => {
  return (
    <StyledPageLayout>
      <StyledText style={styles.title}>Registration screen</StyledText>
      <ContactUsWidget />
    </StyledPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
