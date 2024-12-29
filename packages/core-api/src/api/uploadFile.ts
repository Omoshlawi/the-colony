import { Platform } from "react-native";
import { HiveFileUpload, UploadableFile } from "../types";
import { constructUrl } from "./constructUrl";
import { hiveFetch } from "./hiveFetch";

export const uploadFiles = async (
  {
    path,
    files,
    onProgress,
  }: {
    path: string;
    files: {
      [fieldName: string]: UploadableFile[];
    };
    onProgress?: (progress: number) => void;
  },
  params: Record<string, any> = {}
) => {
  try {
    const formData = new FormData();
    formData.append("path", path);

    // Add files to formData
    Object.keys(files).forEach((fieldName) => {
      files[fieldName].forEach((file) => {
        // Handle file URI based on platform
        const fileToUpload = {
          ...file,
          uri:
            Platform.OS === "android"
              ? file.uri
              : file.uri.replace("file://", ""),
          type: file.type || "application/octet-stream", // Fallback for missing type
          name: file.name || `file-${Date.now()}`, // Fallback for missing name
        };

        formData.append(fieldName, fileToUpload as any);
      });
    });

    const url = constructUrl("/media/upload", params);
    const resp = await hiveFetch<HiveFileUpload>(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      transformRequest: (data) => data,
      onUploadProgress: onProgress
        ? (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 100)
            );
            onProgress(percentCompleted);
          }
        : undefined,
      // timeout: 30000, // 30 second timeout
    });

    return resp.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
