import { handleApiErrors, mutate } from "@colony/core-api";
import { showSnackbar, Button, TextInput } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useRelationshipTypeApi } from "../hooks";
import { RelationshipType, RelationshipTypeFormData } from "../types";
import { RelationshipTypeSchema } from "../utils/validation";

type RelationshipTypesFormProps = {
  relationshipType?: RelationshipType;
  onSuccess?: (rtype: RelationshipType) => void;
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
      const res = relationshipType
        ? await updateRelationshipType(relationshipType?.id, data)
        : await addRelationshipType(data);

      onSuccess?.(res.data);
      showSnackbar({
        title: "succes",
        subtitle: `relationship type ${
          relationshipType ? "updated" : "created"
        } succesfull`,
        kind: "success",
      });
      mutate("/relationship-types");
    } catch (error) {
      const e = handleApiErrors<RelationshipTypeFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
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
          <TextInput
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
          <TextInput
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
          <TextInput
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

      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default RelationshipTypesForm;

const styles = StyleSheet.create({});
