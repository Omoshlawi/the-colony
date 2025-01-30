import {
  handleApiErrors,
  HiveFetchResponse,
  mutate,
  uploadFiles,
} from "@colony/core-api";
import {
  IconButton,
  ImagePickerAsset,
  showSnackbar,
  TextInput,
} from "@colony/core-components";
import { Box, theme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { usePropertiesApi } from "../hooks";
import { PropertyMedia, PropertyMediaFormData } from "../types";
import { PropertyMediaSchema } from "../utils";

type PropertyMediaFormProps = {
  onSuccess?: () => void;
  propertyMedia?: PropertyMedia;
  propertyId: string;
  mediaType: PropertyMediaFormData["type"];
  mediaFiles?: ImagePickerAsset[];
  renderMediaFilePreview?: (assets: ImagePickerAsset[]) => React.ReactNode;
};

const PropertyMediaForm: FC<PropertyMediaFormProps> = ({
  onSuccess,
  propertyMedia,
  propertyId,
  mediaType,
  mediaFiles = [],
  renderMediaFilePreview,
}) => {
  const { addPropertyMedia, updatePropertyMedia } = usePropertiesApi();

  const form = useForm<PropertyMediaFormData>({
    defaultValues: {
      type: mediaType,
    },
    resolver: zodResolver(PropertyMediaSchema),
  });

  const onSubmit: SubmitHandler<PropertyMediaFormData> = async (data) => {
    try {
      const uploaded = await uploadFiles({
        files: {
          images: mediaFiles.map((asset) => ({
            name: asset.fileName,
            type: asset.mimeType,
            uri: asset.uri,
            file: asset.file,
          })),
        },
        path: "images",
      });

      let tasks: Promise<HiveFetchResponse<any, any>>[];
      if (propertyMedia) {
        tasks = Object.keys(uploaded).reduce<
          Array<Promise<HiveFetchResponse<any, any>>>
        >(
          (prev, field) => [
            ...prev,
            ...uploaded[field].map((f) =>
              updatePropertyMedia(propertyId, propertyMedia.id, {
                ...data,
                url: f.path,
                metadata: {
                  memeType: f.memeType,
                  size: Number(f.bytesSize),
                },
              })
            ),
          ],
          []
        );
        // await updatePropertyMedia(propertyId, propertyMedia.id, data);
      } else {
        tasks = Object.keys(uploaded).reduce<
          Array<Promise<HiveFetchResponse<any, any>>>
        >(
          (prev, field) => [
            ...prev,
            ...uploaded[field].map((f) =>
              addPropertyMedia(propertyId, {
                ...data,
                url: f.path,
                metadata: {
                  memeType: f.memeType,
                  size: Number(f.bytesSize),
                },
              })
            ),
          ],
          []
        );
        // await addPropertyMedia(propertyId, data);
      }

      await Promise.all(tasks);
      onSuccess?.();
      showSnackbar({
        title: "succes",
        subtitle: `property media ${
          propertyMedia ? "updated" : "created"
        } succesfull`,
        kind: "success",
      });
      mutate(`/properties/${propertyId}/media`);
    } catch (error) {
      const e = handleApiErrors<PropertyMediaFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyMediaFormData, { message: val })
        );
    }
  };

  useEffect(() => {
    Object.keys(form.formState.errors).forEach((field) => {
      if (field in form.formState.errors) {
        showSnackbar({
          kind: "error",
          title: field,
          subtitle:
            form.formState.errors[field as keyof PropertyMediaFormData]
              ?.message,
        });
      }
    });
  }, [form]);
  return (
    <Box flex={1}>
      {renderMediaFilePreview?.(mediaFiles)}
      <Box
        position={"absolute"}
        bottom={theme.spacing.l}
        left={theme.spacing.m}
        right={theme.spacing.m}
        gap={"m"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Box flex={1}>
          <Controller
            control={form.control}
            name="description"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => (
              <TextInput
                multiline
                value={value}
                readOnly={disabled}
                onChangeText={onChange}
                placeholder="Enter caption ..."
                error={error?.message}
                inputDecorationStyle={{
                  borderRadius: theme.borderRadii.large,
                  backgroundColor: theme.colors.background,
                }}
              />
            )}
          />
        </Box>
        <IconButton
          icon={{ family: "Entypo", name: "upload" }}
          onPress={form.handleSubmit(onSubmit)}
          containerStyle={{ alignSelf: "center" }}
        />
      </Box>
    </Box>
  );
};

export default PropertyMediaForm;

const styles = StyleSheet.create({});
