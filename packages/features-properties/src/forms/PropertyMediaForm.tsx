import { handleApiErrors, mutate } from "@colony/core-api";
import {
  Button,
  IconButton,
  ImagePickerAsset,
  SeachableDropDown,
  showSnackbar,
  TextInput,
} from "@colony/core-components";
import { Box, Text, theme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
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
      if (propertyMedia) {
        await updatePropertyMedia(propertyId, propertyMedia.id, data);
      } else {
        await addPropertyMedia(propertyId, data);
      }
      onSuccess?.();
      showSnackbar({
        title: "succes",
        subtitle: `property ${
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
    const fields: (keyof PropertyMediaFormData)[] = ["metadata", "order"];
    fields.forEach((field) => {
      if (field in form.formState.errors) {
        showSnackbar({
          kind: "error",
          title: field,
          subtitle: form.formState.errors[field]?.message,
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
                // multiline
                // numberOfLines={2}
                value={value}
                readOnly={disabled}
                onChangeText={onChange}
                placeholder="Enter caption ..."
                error={error?.message}
                style={{ borderRadius: theme.borderRadii.large }}
              />
            )}
          />
        </Box>
        <IconButton
          icon={{ family: "Entypo", name: "upload" }}
          onPress={form.handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
};

export default PropertyMediaForm;

const styles = StyleSheet.create({});
