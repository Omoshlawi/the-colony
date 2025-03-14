import { handleApiErrors, mutate } from "@colony/core-api";
import {
  ClickableModalWrapper,
  ExpoIcon,
  ExpoIconComponent,
  LocalExpoIconPicker,
  showSnackbar,
  Button,
  TextInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAmenitiesApi } from "../hooks";
import { Amenity, AmenityFormData } from "../types";
import { AmenitySchema } from "../utils/validation";

type AmenitiesFormProps = {
  amenity?: Amenity;
  onSuccess?: (amenity: Amenity) => void;
};

const AmenitiesForm: FC<AmenitiesFormProps> = ({ amenity, onSuccess }) => {
  const { addAmenity, updateAmenity } = useAmenitiesApi();
  const form = useForm<AmenityFormData>({
    defaultValues: {
      name: amenity?.name ?? "",
      icon: amenity?.icon,
    },
    resolver: zodResolver(AmenitySchema),
  });

  const onSubmit: SubmitHandler<AmenityFormData> = async (data) => {
    try {
      const res = amenity
        ? await updateAmenity(amenity?.id, data)
        : await addAmenity(data);
      onSuccess?.(res.data);
      mutate("/amenities");
      showSnackbar({
        title: "succes",
        subtitle: `amenity ${amenity ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<AmenityFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AmenityFormData, { message: val })
        );
    }
  };
  return (
    <Box width={"100%"} gap={"l"} p={"m"}>
      <Controller
        control={form.control}
        name="name"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <TextInput
            value={value}
            label="Amenity"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter amenity name"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="icon"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <TextInput
            prefixIcon={value && <ExpoIconComponent {...(value as ExpoIcon)} />}
            value={value && `${value.family} / ${value.name}`}
            placeholder="Select icon"
            suffixIcon={
              <ClickableModalWrapper
                title="Seach Icon"
                onRequestClose={() => true}
                renderActions={(dismiss) => (
                  <TouchableOpacity onPress={dismiss} disabled={!value}>
                    <ExpoIconComponent
                      family="Ionicons"
                      name="checkmark"
                      size={28}
                    />
                  </TouchableOpacity>
                )}
                renderContent={() => (
                  <LocalExpoIconPicker
                    selectedIcon={value as ExpoIcon}
                    onSelectIcon={onChange}
                  />
                )}
              >
                <ExpoIconComponent family="Ionicons" name="add" />
              </ClickableModalWrapper>
            }
            readOnly
            label="Amenity icon"
            error={error?.message}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default AmenitiesForm;

const styles = StyleSheet.create({});
