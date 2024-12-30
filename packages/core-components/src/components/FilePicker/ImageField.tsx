import * as ImagePicker from "expo-image-picker";
import React, { FC, useState, useCallback, useRef, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
  Alert,
  DimensionValue,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BottomSheetModalWrapper } from "../Overlays/wrappers";
import { ListTile } from "../ListTile";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { Box, Text } from "@colony/core-theme";
import { FilePickerBaseInputProps } from "./types";
import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export interface CameraConfig {
  defaultFacing?: CameraType;
  flash?: "on" | "off" | "auto";
  enableZoom?: boolean;
  maxZoom?: number;
  captureAudio?: boolean;
  quality?: number;
}

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
    modal?: object;
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
  const [showOptionsBottomSheet, setShowOptionsBottomSheet] = useState(false);
  const [facing, setFacing] = useState<CameraType>(
    cameraConfig.defaultFacing || "back"
  );
  const [mode, setMode] = useState<"camera" | "gallery" | null>(null);
  const [flash, setFlash] = useState(cameraConfig.flash || "off");
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (mode === "camera" && !permission?.granted) {
      requestPermission();
    }
  }, [mode, permission, requestPermission]);

  const handleToggleLaunchBottomSheet = useCallback(() => {
    setShowOptionsBottomSheet((state) => !state);
    setMode(null);
  }, []);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }, []);

  const toggleFlash = useCallback(() => {
    setFlash((current) => {
      switch (current) {
        case "off":
          return "on";
        case "on":
          return "auto";
        default:
          return "off";
      }
    });
  }, []);

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

  const takePicture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: cameraConfig.quality || 0.5,
        exif: true,
      });

      if (photo) {
        onImageChange?.([photo]);
        successCallback?.([photo]);
        handleToggleLaunchBottomSheet();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to capture photo";
      errorCallback?.(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsCapturing(false);
    }
  }, [
    cameraRef,
    isCapturing,
    cameraConfig.quality,
    onImageChange,
    successCallback,
    errorCallback,
    handleToggleLaunchBottomSheet,
  ]);

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
          handleToggleLaunchBottomSheet();
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
      handleToggleLaunchBottomSheet,
      requestMediaLibPermissions,
    ]
  );

  const renderCamera = () => (
    <Box
      flex={1}
      backgroundColor="background"
      style={customStyles.cameraContainer}
    >
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
      >
        <View style={[styles.buttonContainer, customStyles.buttonContainer]}>
          {customButtons?.close || (
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={handleToggleLaunchBottomSheet}
            >
              <ExpoIconComponent
                family="FontAwesome5"
                name="times"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}

          {customButtons?.flash || (
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={toggleFlash}
            >
              <ExpoIconComponent
                family="MaterialIcons"
                name={`flash-${flash}`}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}

          {customButtons?.capture || (
            <TouchableOpacity
              style={[styles.captureButton, customStyles.button]}
              onPress={takePicture}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <ActivityIndicator color="white" size="large" />
              ) : (
                <View style={styles.captureCircle} />
              )}
            </TouchableOpacity>
          )}

          {customButtons?.flipCamera || (
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={toggleCameraFacing}
            >
              <ExpoIconComponent
                family="FontAwesome6"
                name="camera-rotate"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </Box>
  );

  const renderGalleryPicker = () => (
    <>
      <TouchableWithoutFeedback
        style={[styles.flex, customStyles.container]}
        onPress={handleToggleLaunchBottomSheet}
      >
        <View style={styles.flex} />
      </TouchableWithoutFeedback>
      <BottomSheetModalWrapper
        title={modalTitle}
        height={modalHeight}
        onDismiss={handleToggleLaunchBottomSheet}
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
              onPress={() => {
                if (option.title.toLowerCase() === "camera") {
                  setMode("camera");
                } else {
                  pickImageAsync(option.mediaType);
                }
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
        </Box>
      </BottomSheetModalWrapper>
    </>
  );

  if (typeof renderTrigger !== "function") return null;

  return (
    <>
      {renderTrigger(() => setShowOptionsBottomSheet(true))}
      <Modal
        visible={showOptionsBottomSheet}
        onRequestClose={handleToggleLaunchBottomSheet}
        animationType="slide"
        transparent
        style={[styles.modal, customStyles.modal]}
      >
        {mode === "camera" ? renderCamera() : renderGalleryPicker()}
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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 20,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  button: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  captureCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
});

export default ImageField;
