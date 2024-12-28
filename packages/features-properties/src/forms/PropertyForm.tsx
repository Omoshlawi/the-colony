import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property, PropertyFormData } from "../types";
import { usePropertiesApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from "../utils";
import {
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { handleApiErrors, mutate } from "@colony/core-api";
import { Box } from "@colony/core-theme";

type Props = {
  property?: Property;
  onSuccess?: () => void;
};

const PropertyForm: FC<Props> = ({ onSuccess, property }) => {
  const { addProperty, updateProperty } = usePropertiesApi();
  const form = useForm<PropertyFormData>({
    defaultValues: {},
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      if (property) {
        await updateProperty(property?.id, data);
      } else {
        await addProperty(data);
      }
      onSuccess?.();
      showSnackbar({
        title: "succes",
        subtitle: `property ${property ? "updated" : "created"} succesfull`,
        kind: "success",
      });
      mutate("/relationship-types");
    } catch (error) {
      const e = handleApiErrors<PropertyFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyFormData, { message: val })
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
          <StyledInput
            value={value}
            label="Name"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter property name"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="addressId"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Name"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter property name"
            error={error?.message}
          />
        )}
      />

      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({});
