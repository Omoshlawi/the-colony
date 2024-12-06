import { Box, Text } from "@colony/core-theme";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

type Props = PropsWithChildren<{
  title: string;
}>;

const SectionCard: FC<Props> = ({ title, children }) => {
  return (
    <Box backgroundColor={"skeleton"} p={"m"} borderRadius={"large"} gap={"s"}>
      <Text variant={"titleMedium"} color={"text"} fontWeight={"700"}>
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default SectionCard;

const styles = StyleSheet.create({});
