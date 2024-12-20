import { Box, Text, useTheme } from "@colony/core-theme";
import React, { FC, PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  leading?: React.ReactElement;
  defaultExpanded?: boolean;
}>;

const ExpansionTile: FC<Props> = ({
  children,
  leading,
  subtitle,
  title,
  defaultExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useTheme();
  return (
    <Box backgroundColor={expanded ? "disabledColor" : undefined} pb={"m"}>
      <View
        style={[
          styles.tile,
          { padding: theme.spacing.s, gap: theme.spacing.s },
        ]}
      >
        {leading}
        <Box width={"100%"} flex={1} gap={"s"} justifyContent={"center"}>
          {title && (
            <Text color={"text"} variant={"bodyLarge"}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text color={"outline"} variant={"bodyMedium"}>
              {subtitle}
            </Text>
          )}
        </Box>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setExpanded((state) => !state)}
        >
          <ExpoIconComponent
            family="FontAwesome6"
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
          />
        </TouchableOpacity>
      </View>
      {expanded && (
        <Box p={"m"} marginHorizontal={"m"} backgroundColor={"background"}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default ExpansionTile;

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
});
