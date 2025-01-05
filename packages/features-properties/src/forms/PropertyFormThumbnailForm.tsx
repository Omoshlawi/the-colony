import {
  cleanFiles,
  getHiveFileUrl,
  handleApiErrors,
  UploadableFile,
  uploadFiles,
} from "@colony/core-api";
import {
  ExpoIconComponent,
  FilePicker,
  ImageViewer,
  showSnackbar,
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { PropertyFormData } from "../types";

const PropertyFormThumbnailForm = () => {
  const form = useFormContext<PropertyFormData>();
  const theme = useTheme();
  const gray = Color(theme.colors.hintColor);
  const [file, setFile] = useState<UploadableFile>();
  const [loading, setLoading] = useState(false);
  const thumbnail = form.watch("thumbnail");
  useEffect(() => {
    return () => {
      if (thumbnail)
        cleanFiles([thumbnail])
          .then(({ count }) =>
            showSnackbar({
              kind: "success",
              subtitle: `Deleted uploaded thumbnail files (${count}) succesfully`,
            })
          )
          .catch((err) =>
            showSnackbar({
              kind: "error",
              title: "error",
              subtitle: `Error cleaning file: ${JSON.stringify(err, null, 2)}`,
            })
          );
    };
  }, [thumbnail]);

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
          <Box>
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
                  </>
                </TouchableHighlight>
              )}
            />
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
