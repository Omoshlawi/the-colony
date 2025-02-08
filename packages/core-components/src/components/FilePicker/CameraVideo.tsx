import { Box, Text } from "@colony/core-theme";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";

export interface CameraVideoProps {
  onRecordingComplete?: (video: { uri: string }) => void;
  onRecordingProgress?: (progress: { durationMillis: number }) => void;
  onClose?: () => void;
  maxDuration?: number;
  maxSize?: number;
  defaultFacing?: CameraType;
  quality?: "2160p" | "1080p" | "720p" | "480p" | "480p";
  flash?: "on" | "off" | "auto";
  captureAudio?: boolean;
  errorCallback?: (error: string) => void;
  customButtons?: {
    flipCamera?: React.ReactNode;
    record?: React.ReactNode;
    flash?: React.ReactNode;
    close?: React.ReactNode;
  };
  customStyles?: {
    cameraContainer?: object;
    buttonContainer?: object;
    button?: object;
    timerText?: object;
  };
}

const CameraVideo: FC<CameraVideoProps> = ({
  onRecordingComplete,
  onRecordingProgress,
  onClose,
  maxDuration = 60,
  maxSize = 10 * 1024 * 1024,
  defaultFacing = "back",
  quality = "1080p",
  flash: initialFlash = "off",
  captureAudio = true,
  errorCallback,
  customButtons,
  customStyles = {},
}) => {
  const [facing, setFacing] = useState<CameraType>(defaultFacing);
  const [flash, setFlash] = useState(initialFlash);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const recordingTimer = useRef<NodeJS.Timeout>();
  const [permission, requestPermission] = useCameraPermissions();

  const handleCameraPermission = useCallback(async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        const error = "Camera permission is required to record video";
        errorCallback?.(error);
        Alert.alert("Permission Required", error);
        return false;
      }
    }
    return true;
  }, [permission, requestPermission, errorCallback]);

  useEffect(() => {
    if (!permission?.granted) {
      handleCameraPermission();
    }
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, [permission, requestPermission]);

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
        maxDuration,
        maxFileSize: maxSize,
        // quality,
        // mute: !captureAudio,
      });
      if (video) {
        onRecordingComplete?.(video);
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
    maxDuration,
    maxSize,
    quality,
    captureAudio,
    onRecordingComplete,
    onRecordingProgress,
    errorCallback,
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

  return (
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
              onPress={onClose}
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
};

const styles = StyleSheet.create({
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

export default CameraVideo;
