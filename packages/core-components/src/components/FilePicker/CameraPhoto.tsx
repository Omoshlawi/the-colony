import { Box } from "@colony/core-theme";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";

export interface CameraConfig {
  defaultFacing?: CameraType;
  flash?: "on" | "off" | "auto";
  enableZoom?: boolean;
  maxZoom?: number;
  captureAudio?: boolean;
  quality?: number;
}

type Props = {
  cameraConfig: CameraConfig;
  onCaptured?: (assets: CameraCapturedPicture) => void;
  errorCallback?: (error: string) => void;
  onDismiss?: () => void;
  customButtons?: {
    flipCamera?: React.ReactNode;
    capture?: React.ReactNode;
    flash?: React.ReactNode;
    close?: React.ReactNode;
  };
  customStyles?: {
    cameraContainer?: object;
    buttonContainer?: object;
    button?: object;
  };
};

const CameraPhoto: FC<Props> = ({
  cameraConfig,
  onCaptured,
  errorCallback,
  customButtons,
  customStyles,
  onDismiss,
}) => {
  const [facing, setFacing] = useState<CameraType>(
    cameraConfig.defaultFacing || "back"
  );
  const [flash, setFlash] = useState(cameraConfig.flash || "off");
  const [isCapturing, setIsCapturing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

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

  const takePicture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: cameraConfig.quality || 0.5,
        exif: true,
      });

      if (photo) {
        onCaptured?.(photo);
        onDismiss?.();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to capture photo";
      errorCallback?.(errorMessage);
      Alert.alert("Error", errorMessage);
      onDismiss?.();
    } finally {
      setIsCapturing(false);
    }
  }, [cameraRef, isCapturing, cameraConfig.quality, onCaptured, errorCallback]);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <Box
      flex={1}
      backgroundColor="background"
      style={customStyles?.cameraContainer}
    >
      <CameraView
        ref={cameraRef}
        style={styles.flex}
        facing={facing}
        flash={flash}
      >
        <View style={[styles.buttonContainer, customStyles?.buttonContainer]}>
          {customButtons?.close || (
            <TouchableOpacity
              style={[styles.button, customStyles?.button]}
              onPress={onDismiss}
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
              style={[styles.button, customStyles?.button]}
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
              style={[styles.captureButton, customStyles?.button]}
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
              style={[styles.button, customStyles?.button]}
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

export default CameraPhoto;

const styles = StyleSheet.create({
  flex: {
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
  button: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
