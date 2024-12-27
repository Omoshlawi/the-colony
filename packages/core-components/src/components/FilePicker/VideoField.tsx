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
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { BottomSheetModalWrapper } from "../Overlays/wrappers";
import { ListTile } from "../ListTile";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { Box, Text } from "@colony/core-theme";
import { FilePickerBaseInputProps } from "./types";

export interface VideoConfig {
  maxDuration?: number; // in seconds
  defaultFacing?: CameraType;
  quality?: "2160p" | "1080p" | "720p" | "480p" | "480p";
  flash?: "on" | "off" | "auto";
  captureAudio?: boolean;
  maxSize: number;
}

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
  videoConfig?: VideoConfig;
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
    buttonText?: object;
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
    maxSize: 10 * 1024 * 1024, //10MBS,
    defaultFacing: "back",
    quality: "1080p",
    flash: "off",
    captureAudio: true,
  },
  customButtons,
  customStyles = {},
}) => {
  const [showOptionsBottomSheet, setShowOptionsBottomSheet] = useState(false);
  const [facing, setFacing] = useState<CameraType>(
    videoConfig.defaultFacing || "back"
  );
  const [mode, setMode] = useState<"camera" | "gallery" | null>(null);
  const [flash, setFlash] = useState(videoConfig.flash || "off");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const recordingTimer = useRef<NodeJS.Timeout>();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (mode === "camera" && !permission?.granted) {
      requestPermission();
    }
  }, [mode, permission, requestPermission]);

  useEffect(() => {
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, []);

  const handleToggleLaunchBottomSheet = useCallback(() => {
    setShowOptionsBottomSheet((state) => !state);
    setMode(null);
    setRecordingDuration(0);
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }
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

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startRecording = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        maxDuration: videoConfig.maxDuration,
        maxFileSize: videoConfig.maxSize,
        // quality: videoConfig.quality,
        // mute: !videoConfig.captureAudio,
      });

      if (video) {
        onVideoChange?.([video]);
        successCallback?.([video]);
        handleToggleLaunchBottomSheet();
      }

      recordingTimer.current = setInterval(() => {
        setRecordingDuration((prev) => {
          const newDuration = prev + 1000;
          onRecordingProgress?.({ durationMillis: newDuration });
          return newDuration;
        });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to record video";
      errorCallback?.(errorMessage);
      Alert.alert("Error", errorMessage);
      setIsRecording(false);
    }
  }, [
    videoConfig,
    onVideoChange,
    successCallback,
    errorCallback,
    handleToggleLaunchBottomSheet,
    onRecordingProgress,
  ]);

  const stopRecording = useCallback(async () => {
    if (!cameraRef.current || !isRecording) return;

    try {
      await cameraRef.current.stopRecording();
      setIsRecording(false);
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      setRecordingDuration(0);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to stop recording";
      errorCallback?.(errorMessage);
      Alert.alert("Error", errorMessage);
    }
  }, [isRecording, errorCallback]);

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
          handleToggleLaunchBottomSheet();
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
        <View style={styles.timerContainer}>
          {isRecording && (
            <Text style={[styles.timerText, customStyles.timerText]}>
              {formatDuration(recordingDuration)}
            </Text>
          )}
        </View>
        <View style={[styles.buttonContainer, customStyles.buttonContainer]}>
          {customButtons?.close || (
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={handleToggleLaunchBottomSheet}
            >
              <ExpoIconComponent
                family="FontAwesome6"
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

          {customButtons?.record || (
            <TouchableOpacity
              style={[
                styles.recordButton,
                customStyles.button,
                isRecording && styles.recordingButton,
              ]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <View style={styles.stopRecordingIcon} />
              ) : (
                <View style={styles.recordingCircle} />
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
              onPress={() => {
                if (option.title.toLowerCase().includes("record")) {
                  setMode("camera");
                } else {
                  pickVideoAsync(option.mediaType);
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
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "red",
  },
  recordingButton: {
    backgroundColor: "red",
  },
  recordingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
  },
  stopRecordingIcon: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
  },
  timerContainer: {
    position: "absolute",
    top: 40,
    width: "100%",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
});

export default VideoField;
