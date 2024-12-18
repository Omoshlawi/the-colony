import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { showModalBottomSheet } from "../Overlays";
import { StyledButton } from "../StyledButton";
import { Box } from "@colony/core-theme";

type Props = PropsWithChildren<{
  onUpdate?: () => void;
  onDelete?: () => void;
  title: string;
}>;

const ActionsBottomSheet: FC<Props> = ({
  onDelete,
  onUpdate,
  children,
  title,
}) => {
  const handleLaunchBottomsheet = () => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              dispose();
              onUpdate?.();
            }}
          />
          <StyledButton
            title="Delete"
            variant="outline"
            onPress={() => {
              dispose();
              onDelete?.();
            }}
          />
        </Box>
      </ScrollView>,
      { title }
    );
  };
  return <Pressable onPress={handleLaunchBottomsheet}>{children}</Pressable>;
};

export default ActionsBottomSheet;

const styles = StyleSheet.create({});
