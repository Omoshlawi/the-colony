import * as ImagePicker from "expo-image-picker";
import React, { FC, useState, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
  Alert,
  DimensionValue,
} from "react-native";
import { BottomSheetModalWrapper } from "../Overlays/wrappers";
import { ListTile } from "../ListTile";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { Box } from "@colony/core-theme";
import { FilePickerBaseInputProps } from "./types";

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
  customStyles?: {
    modal?: object;
    container?: object;
    optionContainer?: object;
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
  customStyles = {},
}) => {
  const [showOptionsBottomSheet, setShowOptionsBottomSheet] = useState(false);

  const handleToggleLaunchBottomSheet = useCallback(() => {
    setShowOptionsBottomSheet((state) => !state);
  }, []);

  const requestMediaLibPermissions = useCallback(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        const error = "Sorry, we need media lib permissions to make this work!";
        errorCallback?.(error);
        Alert.alert("Permission Required", error);
        return false;
      }
    }
    return true;
  }, [errorCallback]);
  const requestCameraPermissions = useCallback(async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        const error =
          "Sorry, we need camera roll permissions to make this work!";
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
      } finally {
        handleToggleLaunchBottomSheet();
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
      handleToggleLaunchBottomSheet,
      requestMediaLibPermissions,
    ]
  );

  const handleTrigger = useCallback(() => {
    setShowOptionsBottomSheet(true);
  }, []);

  if (typeof renderTrigger !== "function") return null;

  return (
    <>
      {renderTrigger(handleTrigger)}
      <Modal
        visible={showOptionsBottomSheet}
        onRequestClose={handleToggleLaunchBottomSheet}
        animationType="slide"
        transparent
        style={[styles.modal, customStyles.modal]}
      >
        <TouchableWithoutFeedback
          style={[styles.flex, customStyles.container]}
          onPress={handleToggleLaunchBottomSheet}
        >
          <View style={styles.flex} />
        </TouchableWithoutFeedback>

        <BottomSheetModalWrapper
          title={modalTitle}
          height={modalHeight}
          onClose={handleToggleLaunchBottomSheet}
        >
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
                onPress={() => pickImageAsync(option.mediaType)}
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
          </Box>
        </BottomSheetModalWrapper>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modal: {
    margin: 0,
  },
});

export default ImageField;
