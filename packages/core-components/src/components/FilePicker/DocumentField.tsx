import React, { FC, useState, useCallback } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Alert,
  DimensionValue,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { BottomSheetModalWrapper } from "../Overlays/wrappers";
import { ListTile } from "../ListTile";
import { ExpoIconComponent, ExpoIconFamily } from "../ExpoIcons";
import { Box } from "@colony/core-theme";
import { FilePickerBaseInputProps } from "./types";

export interface DocumentOption {
  title: string;
  subtitle: string;
  type: string | string[];
  icon?: {
    family: ExpoIconFamily;
    name: string;
    size?: number;
  };
}

export interface DocumentFieldProps extends FilePickerBaseInputProps {
  maxSelection?: number;
  onDocumentChange?: (result: DocumentPicker.DocumentPickerResult[]) => void;
  options?: DocumentOption[];
  modalHeight?: DimensionValue;
  modalTitle?: string;
  errorCallback?: (error: string) => void;
  successCallback?: (result: DocumentPicker.DocumentPickerResult[]) => void;
  copyToCache?: boolean;
  customStyles?: {
    modal?: object;
    container?: object;
    optionContainer?: object;
  };
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

const defaultOptions: DocumentOption[] = [
  {
    title: "All Files",
    subtitle: "Select any type of file",
    type: "*/*",
    icon: {
      family: "FontAwesome6",
      name: "file",
      size: 18,
    },
  },
  {
    title: "Images",
    subtitle: "Select image files",
    type: "image/*",
    icon: {
      family: "FontAwesome6",
      name: "image",
      size: 18,
    },
  },
  {
    title: "PDFs",
    subtitle: "Select PDF documents",
    type: "application/pdf",
    icon: {
      family: "FontAwesome6",
      name: "file-pdf",
      size: 18,
    },
  },
  {
    title: "Word Documents",
    subtitle: "Select Microsoft Word documents",
    type: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    icon: {
      family: "FontAwesome6",
      name: "file-word",
      size: 18,
    },
  },
];

const DocumentField: FC<DocumentFieldProps> = ({
  renderTrigger,
  multiple = false,
  maxSelection,
  onDocumentChange,
  options = defaultOptions,
  modalHeight = "40%",
  modalTitle = "Choose Document Type",
  errorCallback,
  successCallback,
  copyToCache = true,
  customStyles = {},
  maxFileSize,
  allowedTypes,
}) => {
  const [showOptionsBottomSheet, setShowOptionsBottomSheet] = useState(false);

  const handleToggleLaunchBottomSheet = useCallback(() => {
    setShowOptionsBottomSheet((state) => !state);
  }, []);

  const validateFile = useCallback(
    (file: Partial<DocumentPicker.DocumentPickerResult>) => {
      if ("canceled" in file && file.canceled) {
        return false;
      }

      if ("assets" in file && file.assets) {
        const asset = file.assets[0];

        // Check file size if maxFileSize is specified
        if (maxFileSize && asset.size && asset.size > maxFileSize) {
          const errorMessage = `File size exceeds the maximum limit of ${(
            maxFileSize /
            (1024 * 1024)
          ).toFixed(2)}MB`;
          errorCallback?.(errorMessage);
          Alert.alert("Error", errorMessage);
          return false;
        }

        // Check file type if allowedTypes is specified
        if (allowedTypes && allowedTypes.length > 0 && asset.mimeType) {
          const isAllowedType = allowedTypes.some((type) => {
            if (type.endsWith("/*")) {
              // Handle wildcard MIME types (e.g., "image/*")
              const typePrefix = type.split("/")[0];
              return asset.mimeType?.startsWith(typePrefix);
            }
            return type === asset.mimeType;
          });

          if (!isAllowedType) {
            const errorMessage = "Selected file type is not allowed";
            errorCallback?.(errorMessage);
            Alert.alert("Error", errorMessage);
            return false;
          }
        }

        return true;
      }

      return false;
    },
    [maxFileSize, allowedTypes, errorCallback]
  );

  const pickDocument = useCallback(
    async (type: string | string[]) => {
      try {
        const pickerOptions: DocumentPicker.DocumentPickerOptions = {
          type,
          multiple,
          copyToCacheDirectory: copyToCache,
        };

        if (multiple && maxSelection) {
          // pickerOptions.numSelectionsLimit = maxSelection;
        }

        const result = await DocumentPicker.getDocumentAsync(pickerOptions);

        if (!result.canceled && result.assets) {
          const validFiles = result.assets.filter((asset) =>
            validateFile({ assets: [asset] })
          );

          if (validFiles.length > 0) {
            onDocumentChange?.([{ ...result, assets: validFiles }]);
            successCallback?.([{ ...result, assets: validFiles }]);
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to pick document";
        errorCallback?.(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        handleToggleLaunchBottomSheet();
      }
    },
    [
      multiple,
      maxSelection,
      copyToCache,
      validateFile,
      onDocumentChange,
      successCallback,
      errorCallback,
      handleToggleLaunchBottomSheet,
    ]
  );

  const filteredOptions = allowedTypes
    ? options.filter((option) => {
        const optionTypes = Array.isArray(option.type)
          ? option.type
          : [option.type];
        return optionTypes.some((type) =>
          allowedTypes.some((allowedType) => {
            if (allowedType.endsWith("/*")) {
              const typePrefix = allowedType.split("/")[0];
              return type.startsWith(typePrefix);
            }
            return type === allowedType;
          })
        );
      })
    : options;

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
          onDismiss={handleToggleLaunchBottomSheet}
        >
          <Box
            flex={1}
            width="100%"
            height="100%"
            p="m"
            style={customStyles.optionContainer}
          >
            {filteredOptions.map((option, index) => (
              <ListTile
                key={`${option.title}-${index}`}
                onPress={() => pickDocument(option.type)}
                title={option.title}
                subtitle={option.subtitle}
                borderBottom={index !== filteredOptions.length - 1}
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

export default DocumentField;
