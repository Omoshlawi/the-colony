import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Box } from "@colony/core-theme";
import { Button, ExpoIconComponent, showModal } from "@colony/core-components";
import { PropertyForm } from "../forms";
import { Property } from "../types";

type PropertyActionsProps = {
  onAction?: () => void;
  property: Property;
};

const PropertyActions: FC<PropertyActionsProps> = ({ onAction, property }) => {
  const handleEdit = () => {
    const dispose = showModal(
      <PropertyForm
        property={property}
        onSuccess={() => {
          onAction?.();
          dispose();
        }}
      />
    );
  };
  return (
    <Box
      flexDirection={"row"}
      gap={"m"}
      p="m"
      alignItems={"center"}
      flexWrap={"wrap"}
      pb={"l"}
    >
      <Button
        title="Add Photo"
        borderRadius="medium"
        variant="tertiary"
        style={{ width: "48%" }}
        renderIcon={({ size, color }) => (
          <ExpoIconComponent
            size={size}
            family="FontAwesome"
            name="camera"
            color={color}
          />
        )}
        onPress={onAction}
      />
      <Button
        title="Add Video"
        borderRadius="medium"
        variant="tertiary"
        style={{ width: "48%" }}
        renderIcon={({ size, color }) => (
          <ExpoIconComponent
            size={size}
            family="FontAwesome"
            name="video-camera"
            color={color}
          />
        )}
        onPress={onAction}
      />
      <Button
        variant="tertiary"
        borderRadius="medium"
        title="Update property details"
        renderIcon={({ size, color }) => (
          <ExpoIconComponent
            size={size}
            family="FontAwesome"
            name="edit"
            color={color}
          />
        )}
        onPress={() => {
          onAction?.();
          handleEdit();
        }}
      />
      <Button
        borderRadius="medium"
        variant="tertiary"
        title="Add Relationships"
        renderIcon={({ size, color }) => (
          <ExpoIconComponent
            size={size}
            family="MaterialCommunityIcons"
            name="family-tree"
            color={color}
          />
        )}
        onPress={onAction}
      />
    </Box>
  );
};

export default PropertyActions;

const styles = StyleSheet.create({});
