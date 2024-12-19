import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { showModal, showModalBottomSheet } from "../Overlays";
import { StyledButton } from "../StyledButton";
import { Box } from "@colony/core-theme";

type Props = PropsWithChildren<{
  onDelete?: () => void;
  title: string;
  renderForm?: (onDispose: () => void) => React.ReactElement;
  formTitle?: string;
}>;

const ActionsBottomSheet: React.FC<Props> = ({
  onDelete,
  children,
  title,
  renderForm,
  formTitle,
}) => {
  const handleLaunchBottomsheet = () => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          {typeof renderForm === "function" && (
            <StyledButton
              title="Update"
              variant="outline"
              onPress={() => {
                dispose();
                handleUpdate?.();
              }}
            />
          )}
          {typeof onDelete === "function" && (
            <StyledButton
              title="Delete"
              variant="outline"
              onPress={() => {
                dispose();
                onDelete?.();
              }}
            />
          )}
        </Box>
      </ScrollView>,
      { title }
    );
  };

  const handleUpdate = () => {
    const dispose = showModal(
      renderForm?.(() => dispose()),
      { title: formTitle }
    );
  };

  return (
    <TouchableOpacity onPress={handleLaunchBottomsheet}>
      {children}
    </TouchableOpacity>
  );
};

export default ActionsBottomSheet;

const styles = StyleSheet.create({});
