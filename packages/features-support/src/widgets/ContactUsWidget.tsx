import { ExpoIconComponent, ListTile } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export const ContactUsWidget = () => {
  const router = useRouter();
  return (
    <Box style={{ marginTop: 16 }}>
      <ListTile
        title="Call us"
        borderBottom
        leading={<ExpoIconComponent family="Ionicons" name="call" />}
        onPress={() => router.navigate("/(support)/call-us")}
      />
      <ListTile
        title="Chat with us"
        leading={<ExpoIconComponent family="Ionicons" name="chat" />}
        onPress={() => router.navigate("/(support)/chat-with-us")}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  firstListItem: {
    marginBottom: 16,
  },
});
