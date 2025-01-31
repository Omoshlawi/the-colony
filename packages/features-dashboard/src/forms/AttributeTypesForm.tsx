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
import { TouchableOpacity } from "react-native";
import { useAttributeTypeApi } from "../hooks";
import { AttributeType, AttributeTypeFormData } from "../types";
import { AttributeTypeSchema } from "../utils/validation";

type AttributeTypesFormProps = {
  attributeType?: AttributeType;
  onSuccess?: (attrType: AttributeType) => void;
};

const AttributeTypesForm: FC<AttributeTypesFormProps> = ({
  attributeType,
  onSuccess,
}) => {
  const { addAttributeType, updateAttributeType } = useAttributeTypeApi();

  const form = useForm<AttributeTypeFormData>({
    defaultValues: {
      name: attributeType?.name ?? "",
      icon: attributeType?.icon,
    },
    resolver: zodResolver(AttributeTypeSchema),
  });

  const onSubmit: SubmitHandler<AttributeTypeFormData> = async (data) => {
    try {
      const res = attributeType
        ? await updateAttributeType(attributeType?.id, data)
        : await addAttributeType(data);
      showSnackbar({
        title: "succes",
        subtitle: `attribute ${
          attributeType ? "updated" : "created"
        } succesfull`,
        kind: "success",
      });
      onSuccess?.(res.data);
      mutate("/attribute-types");
    } catch (error) {
      const e = handleApiErrors<AttributeTypeFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AttributeTypeFormData, { message: val })
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
            label="Attribute type"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="e.g bedrooms"
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
            label="Attribute type icon"
            error={error?.message}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};
export default AttributeTypesForm;
