import { Box } from "@colony/core-theme";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback } from "react";
import { Alert, DimensionValue, Platform, StyleSheet } from "react-native";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { ListTile } from "../ListTile";
import { showModal, showModalBottomSheet } from "../Overlays";
import CameraVideo from "./CameraVideo";
import { FilePickerBaseInputProps } from "./types";

export interface VideoPickerOption {
  title: string;
  subtitle: string;
  mediaType: ImagePicker.MediaType;
  icon?: {
    family: ExpoIconFamily;
    name: string;
    size?: number;
  };
}

export interface VideoFieldProps extends FilePickerBaseInputProps {
  maxSelection?: number;
  onVideoChange?: (
    assets:
      | ImagePicker.ImagePickerAsset[]
      | Pick<ImagePicker.ImagePickerAsset, "uri">[]
  ) => void;
  onRecordingProgress?: (progress: { durationMillis: number }) => void;
  options?: VideoPickerOption[];
  modalHeight?: DimensionValue;
  modalTitle?: string;
  errorCallback?: (error: string) => void;
  successCallback?: (
    assets:
      | ImagePicker.ImagePickerAsset[]
      | Pick<ImagePicker.ImagePickerAsset, "uri">[]
  ) => void;
  videoConfig?: {
    maxDuration?: number;
    maxSize?: number;
    defaultFacing?: "front" | "back";
    quality?: "2160p" | "1080p" | "720p" | "480p" | "480p";
    flash?: "on" | "off" | "auto";
    captureAudio?: boolean;
  };
  customButtons?: {
    flipCamera?: React.ReactNode;
    record?: React.ReactNode;
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
    timerText?: object;
  };
}

const defaultOptions: VideoPickerOption[] = [
  {
    title: "Record Video",
    subtitle: "Record a new video using camera",
    mediaType: "videos",
    icon: {
      family: "FontAwesome6",
      name: "video",
      size: 18,
    },
  },
  {
    title: "Gallery",
    subtitle: "Choose from existing videos",
    mediaType: "videos",
    icon: {
      family: "FontAwesome6",
      name: "photo-film",
      size: 18,
    },
  },
];

const VideoField: FC<VideoFieldProps> = ({
  renderTrigger,
  multiple = false,
  maxSelection,
  onVideoChange,
  onRecordingProgress,
  options = defaultOptions,
  modalHeight = "25%",
  modalTitle = "Choose Option",
  errorCallback,
  successCallback,
  videoConfig = {
    maxDuration: 60,
    maxSize: 10 * 1024 * 1024,
    defaultFacing: "back",
    quality: "1080p",
    flash: "off",
    captureAudio: true,
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

  const pickVideoAsync = useCallback(
    async (mediaType: ImagePicker.MediaType) => {
      try {
        const hasPermission = await requestMediaLibPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: mediaType,
          allowsEditing: false,
          quality: 1,
          allowsMultipleSelection: multiple,
          selectionLimit: maxSelection,
          videoMaxDuration: videoConfig.maxDuration,
        });

        if (!result.canceled) {
          onVideoChange?.(result.assets);
          successCallback?.(result.assets);

        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to pick video";
        errorCallback?.(errorMessage);
        Alert.alert("Error", errorMessage);
      }
    },
    [
      multiple,
      maxSelection,
      videoConfig.maxDuration,
      onVideoChange,
      successCallback,
      errorCallback,
      requestMediaLibPermissions,
    ]
  );

  const handleRecordingComplete = useCallback(
    (video: { uri: string }) => {
      onVideoChange?.([video]);
      successCallback?.([video]);
    },
    [onVideoChange, successCallback]
  );



  const handleRecordVideo = () => {
    const dispose = showModal(
      <CameraVideo
        onRecordingComplete={handleRecordingComplete}
        onRecordingProgress={onRecordingProgress}
        onClose={() => dispose()}
        maxDuration={videoConfig.maxDuration}
        maxSize={videoConfig.maxSize}
        defaultFacing={videoConfig.defaultFacing}
        quality={videoConfig.quality}
        flash={videoConfig.flash}
        captureAudio={videoConfig.captureAudio}
        errorCallback={errorCallback}
        customButtons={customButtons}
        customStyles={{
          cameraContainer: customStyles.cameraContainer,
          buttonContainer: customStyles.buttonContainer,
          button: customStyles.button,
          timerText: customStyles.timerText,
        }}
      />
    );
  };

  const handleShowOptions = () => {
    const dispose = showModalBottomSheet(
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
              if (option.title.toLowerCase().includes("record")) {
                handleRecordVideo();
              } else {
                await pickVideoAsync(option.mediaType);
              }
              dispose();
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
      { height: modalHeight, title: modalTitle }
    );
  };

  if (typeof renderTrigger !== "function") return null;

  return <>{renderTrigger(handleShowOptions)}</>;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  modal: {
    margin: 0,
  },
});

export default VideoField;
