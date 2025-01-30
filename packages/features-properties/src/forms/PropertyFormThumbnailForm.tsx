import {
  cleanFiles,
  getHiveFileUrl,
  handleApiErrors,
  UploadableFile,
  uploadFiles,
} from "@colony/core-api";
import {
  AlertDialog,
  ExpoIconComponent,
  FilePicker,
  IconButton,
  ImageViewer,
  showDialog,
  showSnackbar,
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { PropertyFormData } from "../types";

type Props = {};
const PropertyFormThumbnailForm: FC<Props> = () => {
  const form = useFormContext<PropertyFormData>();
  const theme = useTheme();
  const gray = Color(theme.colors.hintColor);
  const [file, setFile] = useState<UploadableFile>();
  const [loading, setLoading] = useState(false);
  const thumbnail = form.watch("thumbnail");

  const handleDeleteUploadedFile = useCallback(() => {
    const dispose = showDialog(
      <AlertDialog
        message={
          "Are you sure you want to delete this file?.This action is irriversible"
        }
        title="Delete File"
        actions={[
          {
            title: "Delete",
            onPress: () => {
              dispose();
              handleClean(thumbnail);
            },
            color: theme.colors.error,
          },
          {
            title: "Cancel",
            onPress: () => dispose(),
            color: theme.colors.text,
          },
        ]}
      />
    );
  }, [theme, thumbnail]);

  const handleClean = useCallback(async (file: string) => {
    try {
      const { count } = await cleanFiles([file]);
      form?.setValue("thumbnail", "");
      if (count)
        showSnackbar({
          kind: "success",
          subtitle: `Deleted uploaded thumbnail files (${count}) succesfully`,
        });
    } catch (error) {
      showSnackbar({
        kind: "error",
        title: "error",
        subtitle: `Error cleaning file: ${JSON.stringify(error, null, 2)}`,
      });
    }
  }, []);

  const initialThumbnail = useMemo(
    () => form.formState.defaultValues?.thumbnail?.trim(),
    []
  );

  useEffect(() => {
    // Cleanup function to delete the file when:
    // 1. file has been uploaded (thumbnail field is truthy)
    // 2. the file (thumbnail value) isn't the same as the initial value and form is not launched in
    // 3. When the form aitn submited succesfully
    return () => {
      if (
        thumbnail &&
        initialThumbnail !== thumbnail &&
        !initialThumbnail &&
        form.formState.isSubmitSuccessful
      ) {
        handleClean(thumbnail);
      }
    };
  }, [thumbnail, handleClean, form, initialThumbnail]);

  return (
    <Controller
      control={form.control}
      name="thumbnail"
      render={({ field: { name, onChange, value }, fieldState: { error } }) => {
        // TODO Find a way t prompt user before exiting before saving and give image/file cleaning optunity if unsaved
        const handleUpload = async () => {
          try {
            setLoading(true);
            const uploaded = await uploadFiles({
              path: "properties",
              files: { thumbnail: [file!] },
              onProgress: (progress) => console.log("Progress ", progress, "%"),
            });
            const thumbnail = uploaded["thumbnail"][0];
            onChange(thumbnail.path);
            setFile(undefined);
            showSnackbar({
              kind: "success",
              title: "success",
              subtitle: "File upploaded succesfully",
            });
          } catch (e) {
            showSnackbar({
              kind: "error",
              title: "File upload error",
              subtitle: JSON.stringify(handleApiErrors(e), null, 2),
            });
          } finally {
            setLoading(false);
          }
        };
        return (
          <Box gap={"s"}>
            <Text color={"text"}>Thumbnail</Text>
            <FilePicker.ImageField
              multiple={false}
              onImageChange={([{ uri, mimeType, fileName, file }]) =>
                setFile({
                  name: fileName!,
                  type: mimeType!,
                  uri: uri,
                  file: file,
                })
              }
              renderTrigger={(onTrigger) => (
                <TouchableHighlight
                  onPress={!value ? onTrigger : undefined}
                  underlayColor={gray.darken(0.1).toString()}
                  disabled={loading}
                  style={[
                    styles.trigger,
                    {
                      gap: theme.spacing.m,
                      borderRadius: theme.borderRadii.medium,
                      overflow: "hidden",
                    },
                    !file?.uri && {
                      backgroundColor: gray.lighten(0.1).toString(),
                    },
                  ]}
                >
                  <>
                    {(file?.uri || value) && (
                      <ImageViewer
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                        source={
                          file?.uri ??
                          (value ? getHiveFileUrl(value) : undefined)
                        }
                      />
                    )}
                    {(file?.uri || value) && (
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backgroundColor: Color("black").alpha(0.2).toString(),
                        }}
                      />
                    )}
                    {file?.uri && (
                      <View
                        style={{
                          position: "absolute",
                          top: theme.spacing.s,
                          right: theme.spacing.s,
                          flexDirection: "row",
                          gap: theme.spacing.s,
                        }}
                      >
                        <TouchableOpacity onPress={() => setFile(undefined)}>
                          <ExpoIconComponent
                            family="FontAwesome"
                            name="times-circle"
                            color={theme.colors.error}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUpload}>
                          <ExpoIconComponent
                            family="FontAwesome"
                            name="check-circle"
                            color={theme.colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    {/* Default upload */}
                    {!value && (
                      <>
                        <ExpoIconComponent
                          family="Feather"
                          name="upload"
                          color={"white"}
                        />
                        <Text style={{ color: "white" }}>Upload thumbnail</Text>
                      </>
                    )}
                    {/* Loading indicator when uploading */}
                    {loading && (
                      <View style={[styles.loading]}>
                        <ActivityIndicator color={"white"} />
                        <Text style={{ color: "white" }} fontWeight={"700"}>
                          Uploading ...
                        </Text>
                      </View>
                    )}
                    {/* Delete Uploaded File */}

                    {thumbnail && (
                      <IconButton
                        color="red"
                        icon={{ family: "FontAwesome", name: "trash" }}
                        variant="tonal"
                        onPress={handleDeleteUploadedFile}
                        size={30}
                        containerStyle={{
                          padding: theme.spacing.m,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </>
                </TouchableHighlight>
              )}
            />
            {error?.message && <Text color={"error"}>{error?.message}</Text>}
          </Box>
        );
      }}
    />
  );
};

export default PropertyFormThumbnailForm;

const styles = StyleSheet.create({
  trigger: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: Color("black").alpha(0.5).toString(),
    justifyContent: "center",
    alignItems: "center",
  },
});
