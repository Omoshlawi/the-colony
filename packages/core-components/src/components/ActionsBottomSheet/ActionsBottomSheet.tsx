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
import { Button } from "../Button";
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
            <Button
              title="Update"
              variant="tertiary"
              onPress={() => {
                dispose();
                handleUpdate?.();
              }}
            />
          )}
          {typeof onDelete === "function" && (
            <Button
              title="Delete"
              variant="tertiary"
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
