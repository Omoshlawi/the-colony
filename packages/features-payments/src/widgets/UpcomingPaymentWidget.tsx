import { Logo } from "@colony/core-components";
import { View } from "react-native";
import { NETFLIX_LOGO } from "./logos";
import { Box, Text } from "@colony/core-theme";

export const UpcomingPaymentWidget = () => {
  return (
    <Box style={{ marginTop: 16, padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginRight: 40, width: "55%", alignItems: "center" }}>
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            Upcoming payment
          </Text>
          <Text style={{ textAlign: "center" }}>
            You have a £9 payment to Netflix scheduled to be taken tomorrow
          </Text>
        </View>
        <Logo />
      </View>
    </Box>
  );
};
