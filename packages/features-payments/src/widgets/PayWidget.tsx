import { useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export const PayWidget = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 16 }}>
      <Text>Pay widget</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lastListItem: {
    marginTop: 16,
  },
});
