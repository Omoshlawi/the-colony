import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme, Text } from "@colony/core-theme";

type Props = {
  label?: string;
  value?: boolean;
  onValueChange?: (changed: boolean) => void;
};

const Checkbox: React.FC<Props> = ({ label, onValueChange, value }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.checkboxOuter,
          value && { borderColor: theme.colors.outline },
        ]}
      >
        {value && (
          <View
            style={[
              styles.checkboxInner,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </View>
      <Text color={"outline"} style={[styles.itemText]}>
        {label}
      </Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  checkboxInner: {
    width: 10,
    height: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
