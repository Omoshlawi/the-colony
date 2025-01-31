import {
  getHiveFileUrl,
  UploadableFile
} from "@colony/core-api";
import {
  ExpoIconComponent,
  FilePicker,
  ImageViewer
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  TouchableHighlight,
  View
} from "react-native";
import { PropertyFormData } from "../types";

type Props = {
  image?: UploadableFile;
  onImageChange?: React.Dispatch<
    React.SetStateAction<UploadableFile | undefined>
  >;
};
const PropertyFormThumbnailForm: FC<Props> = ({
  image: file,
  onImageChange: setFile,
}) => {
  const form = useFormContext<PropertyFormData>();
  const theme = useTheme();
  const gray = Color(theme.colors.hintColor);

  return (
    <Controller
      control={form.control}
      name="thumbnail"
      render={({ field: { name, onChange, value }, fieldState: { error } }) => {
        return (
          <Box gap={"s"}>
            <Text color={"text"}>Thumbnail</Text>
            <FilePicker.ImageField
              multiple={false}
              onImageChange={([{ uri, mimeType, fileName, file }]) =>
                setFile?.({
                  name: fileName!,
                  type: mimeType!,
                  uri: uri,
                  file: file,
                })
              }
              renderTrigger={(onTrigger) => (
                <TouchableHighlight
                  onPress={onTrigger}
                  underlayColor={gray.darken(0.1).toString()}
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
                    {/* dEFAULT IMAGE OR SELECTED IMAGE */}
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

                    {/* Black overlay */}
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
                    {/* Upload icon and label */}

                    <ExpoIconComponent
                      family="Feather"
                      name="upload"
                      color={"white"}
                    />
                    <Text style={{ color: "white" }}>Upload thumbnail</Text>
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
