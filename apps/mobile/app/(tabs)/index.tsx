import {
  ExpoIcon,
  FilePicker,
  InputSkeleton,
  ListTileSkeleton,
  StyledPageLayout,
} from "@colony/core-components";
import { useSession } from "@colony/core-global";
import { Box, Text, useTheme } from "@colony/core-theme";
import { Redirect } from "expo-router";
import { useState } from "react";
import { LogBox, StyleSheet, TouchableOpacity } from "react-native";

LogBox.ignoreAllLogs();

export default function HomeScreen() {
  const { currentOrganization } = useSession();
  const them = useTheme();
  const [iconFamily, seticonFamily] = useState<string>();
  const [icon, setIcon] = useState<ExpoIcon>();

  if (currentOrganization) return <Redirect href={"/(tabs)/dashboard"} />;

  return (
    <StyledPageLayout>
      <Box gap={"m"} p={"m"}>
        <InputSkeleton />
        <ListTileSkeleton />
        <FilePicker.ImageField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          multiple
          maxSelection={2}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick image</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
        <FilePicker.DocumentField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick Document</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
        <FilePicker.VideoField
          successCallback={(assets) => alert(JSON.stringify(assets, null, 2))}
          renderTrigger={(handleClick) => (
            <TouchableOpacity onPress={handleClick}>
              <Box p={"m"} backgroundColor={"primary"} borderRadius={"small"}>
                <Text>Pick Video</Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </StyledPageLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
