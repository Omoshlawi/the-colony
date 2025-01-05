import { Platform } from "react-native";
import { HiveFileUpload, UploadableFile } from "../types";
import { constructUrl } from "./constructUrl";
import { hiveFetch } from "./hiveFetch";
import handleAPIErrors from "./handleApiErrors";

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

        formData.append(
          fieldName,
          Platform.OS === "web"
            ? (fileToUpload.file as Blob)
            : (fileToUpload as any),
          fileToUpload.name
        );
      });
    });

    const url = constructUrl("/media/files/upload", params);
    const resp = await hiveFetch<HiveFileUpload>(url, {
      method: "POST",
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
      timeout: 30000, // 30 second timeout
    });

    return resp.data;
  } catch (error: any) {
    console.error("Upload error:", handleAPIErrors(error));
    throw error;
  }
};

export const cleanFiles = async (paths: Array<string>) => {
  try {
    const resp = await hiveFetch<{ count: number }>("/media/clean", {
      method: "DELETE",
      data: { paths },
    });
    return resp.data;
  } catch (error) {
    console.error("Clean files error", handleAPIErrors(error));
    throw error;
  }
};
