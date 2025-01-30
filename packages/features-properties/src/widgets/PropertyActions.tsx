import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Box } from "@colony/core-theme";
import {
  Button,
  ExpoIconComponent,
  FilePicker,
  ImagePickerAsset,
  ImageViewer,
  showModal,
  showModalBottomSheet,
} from "@colony/core-components";
import { PropertyForm, PropertyMediaForm } from "../forms";
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

  const handleAddMedia = (assets: ImagePickerAsset[]) => {
    const dispose = showModal(
      <PropertyMediaForm
        onSuccess={() => dispose()}
        mediaFiles={assets}
        mediaType="Image"
        propertyId={property.id}
        renderMediaFilePreview={([{ uri, mimeType, fileName, file }]) => (
          <Box
            position={"absolute"}
            top={0}
            right={0}
            bottom={0}
            left={0}
            pb={"xl"}
          >
            <ImageViewer
              source={uri}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </Box>
        )}
      />,
      {
        title: "Add Property Media",
      }
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
      <FilePicker.ImageField
        renderTrigger={(onTrigger) => (
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
            onPress={() => {
              onAction?.();
              onTrigger();
            }}
          />
        )}
        onImageChange={handleAddMedia}
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
