import { Box } from "@colony/core-theme";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback, useState } from "react";
import { Alert, DimensionValue, Platform, StyleSheet } from "react-native";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { ListTile } from "../ListTile";
import { FilePickerBaseInputProps } from "./types";

import { showModal, showModalBottomSheet } from "../Overlays";
import CameraPhoto, { CameraConfig } from "./CameraPhoto";

export interface ImagePickerOption {
  title: string;
  subtitle: string;
  mediaType: ImagePicker.MediaType;
  icon?: {
    family: ExpoIconFamily;
    name: string;
    size?: number;
  };
}

export interface ImageFieldProps extends FilePickerBaseInputProps {
  maxSelection?: number;
  onImageChange?: (assets: ImagePicker.ImagePickerAsset[]) => void;
  quality?: number;
  allowsEditing?: boolean;
  options?: ImagePickerOption[];
  modalHeight?: DimensionValue;
  modalTitle?: string;
  errorCallback?: (error: string) => void;
  successCallback?: (assets: ImagePicker.ImagePickerAsset[]) => void;
  cameraConfig?: CameraConfig;
  customButtons?: {
    flipCamera?: React.ReactNode;
    capture?: React.ReactNode;
    flash?: React.ReactNode;
    close?: React.ReactNode;
  };
  customStyles?: {
    container?: object;
    optionContainer?: object;
    cameraContainer?: object;
    buttonContainer?: object;
    button?: object;
    buttonText?: object;
  };
}

const defaultOptions: ImagePickerOption[] = [
  {
    title: "Camera",
    subtitle: "Take a photo using camera",
    mediaType: "images",
    icon: {
      family: "FontAwesome6",
      name: "camera",
      size: 18,
    },
  },
  {
    title: "Gallery",
    subtitle: "Pick from existing images",
    mediaType: "images",
    icon: {
      family: "FontAwesome6",
      name: "image",
      size: 18,
    },
  },
];

const ImageField: FC<ImageFieldProps> = ({
  renderTrigger,
  multiple = false,
  maxSelection,
  onImageChange,
  quality = 1,
  allowsEditing = true,
  options = defaultOptions,
  modalHeight = "25%",
  modalTitle = "Choose Option",
  errorCallback,
  successCallback,
  cameraConfig = {
    defaultFacing: "back",
    flash: "off",
    enableZoom: true,
    maxZoom: 5,
    captureAudio: false,
    quality: 0.5,
  },
  customButtons,
  customStyles = {},
}) => {
  const requestMediaLibPermissions = useCallback(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        const error =
          "Sorry, we need media library permissions to make this work!";
        errorCallback?.(error);
        Alert.alert("Permission Required", error);
        return false;
      }
    }
    return true;
  }, [errorCallback]);

  const pickImageAsync = useCallback(
    async (mediaType: ImagePicker.MediaType) => {
      try {
        const hasPermission = await requestMediaLibPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: mediaType,
          allowsEditing,
          quality,
          allowsMultipleSelection: multiple,
          selectionLimit: maxSelection,
        });

        if (!result.canceled) {
          onImageChange?.(result.assets);
          successCallback?.(result.assets);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to pick image";
        errorCallback?.(errorMessage);
        Alert.alert("Error", errorMessage);
      }
    },
    [
      multiple,
      maxSelection,
      quality,
      allowsEditing,
      onImageChange,
      successCallback,
      errorCallback,
      requestMediaLibPermissions,
    ]
  );

  const handleShowOptions = () => {
    const dismiss = showModalBottomSheet(
      <Box
        flex={1}
        width="100%"
        height="100%"
        p="m"
        style={customStyles.optionContainer}
      >
        {options.map((option, index) => (
          <ListTile
            key={`${option.title}-${index}`}
            onPress={async () => {
              if (option.title.toLowerCase() === "camera") {
                handleTakePhoto();
              } else {
                await pickImageAsync(option.mediaType);
              }
              dismiss();
            }}
            title={option.title}
            subtitle={option.subtitle}
            borderBottom={index !== options.length - 1}
            trailing={
              option.icon && (
                <ExpoIconComponent
                  family={option.icon.family}
                  name={option.icon.name}
                  size={option.icon.size}
                />
              )
            }
          />
        ))}
      </Box>,
      { title: "Pick option" }
    );
  };

  const handleTakePhoto = () => {
    const dispose = showModal(
      <CameraPhoto
        cameraConfig={cameraConfig}
        errorCallback={(err) => {
          errorCallback?.(err);
        }}
        customStyles={customStyles}
        customButtons={customButtons}
        onCaptured={(photo) => {
          onImageChange?.([photo]);
          successCallback?.([photo]);
        }}
        onDismiss={() => dispose()}
      />
    );
  };

  if (typeof renderTrigger !== "function") return null;

  return <>{renderTrigger(() => handleShowOptions())}</>;
};

const styles = StyleSheet.create({});

export default ImageField;
