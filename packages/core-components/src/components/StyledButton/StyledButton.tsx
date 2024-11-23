import { Box, Text } from "@colony/core-theme";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface StyledButtonProps {
  title: string;
  variant?: "filled" | "outline";
  onPress?: () => void;
}

const StyledButton: FC<StyledButtonProps> = ({
  title,
  variant = "filled",
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.presable}
      activeOpacity={0.5}
    >
      <Box
        backgroundColor={variant === "filled" ? "primary" : undefined}
        p={"m"}
        borderRadius={"small"}
        width={"100%"}
        borderWidth={variant === "outline" ? 1 : undefined}
        borderColor={"outline"}
        elevation={1}
        shadowColor={"shadow"}
        shadowOffset={{ height: 10, width: 10 }}
      >
        <Text
          variant={"bodyMedium"}
          color={"outline"}
          fontWeight={"700"}
          style={(styles as any)[variant]}
          textAlign={"center"}
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  filled: {
    color: "white",
  },
  presable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
