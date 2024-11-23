import { FC, PropsWithChildren } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { microColors } from "../../colors";
import { Box } from "@colony/core-theme";
import { useUserPreferences } from "@colony/core-global";
import { Switch } from "react-native";

interface Props extends PropsWithChildren {
  withSafeArea?: boolean;
}

export const StyledPageLayout: FC<Props> = ({
  children,
  withSafeArea = true,
}) => {
  const {
    userPreferences: { theme },
    setTheme,
  } = useUserPreferences();
  return (
    <Box
      backgroundColor={"background"}
      flex={1}
      height={"100%"}
      flexGrow={1}
      flexDirection={"column"}
    >
      {withSafeArea && (
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      )}
      {!withSafeArea && children}
      <Switch
        style={{ position: "absolute", bottom: 40, right: 40 }}
        value={theme === "dark"}
        onValueChange={(enabled) => setTheme(enabled ? "dark" : "light")}
      />
    </Box>
  );
};
