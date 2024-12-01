import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { RelationshipType, RelationshipTypeFormData } from "../types";
import { useRelationshipTypeApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RelationshipTypeSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiErrors, mutate } from "@colony/core-api";
import { Box } from "@colony/core-theme";
import { StyledButton, StyledInput } from "@colony/core-components";

type RelationshipTypesFormProps = {
  relationshipType?: RelationshipType;
  onSuccess?: () => void;
};

const RelationshipTypesForm: FC<RelationshipTypesFormProps> = ({
  onSuccess,
  relationshipType,
}) => {
  const { addRelationshipType, updateRelationshipType } =
    useRelationshipTypeApi();
  const form = useForm<RelationshipTypeFormData>({
    defaultValues: {
      aIsToB: relationshipType?.aIsToB ?? "",
      bIsToA: relationshipType?.bIsToA ?? "",
      description: relationshipType?.description,
    },
    resolver: zodResolver(RelationshipTypeSchema),
  });

  const onSubmit: SubmitHandler<RelationshipTypeFormData> = async (data) => {
    try {
      if (relationshipType) {
        await updateRelationshipType(relationshipType?.id, data);
      } else {
        await addRelationshipType(data);
      }
      onSuccess?.();
      mutate("/relationship-types");
    } catch (error) {
      const e = handleApiErrors<RelationshipTypeFormData>(error);
      if (e.detail) {
        console.log(__filename, error);
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RelationshipTypeFormData, { message: val })
        );
    }
  };

  return (
    <Box width={"100%"} gap={"l"} p={"m"}>
      <Controller
        control={form.control}
        name="aIsToB"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="A is to B"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="e.g is part of"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="bIsToA"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="B is to A"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="e.g contains"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Description"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter description..."
            error={error?.message}
            multiline
            numberOfLines={2}
          />
        )}
      />

      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default RelationshipTypesForm;

const styles = StyleSheet.create({});
