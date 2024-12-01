import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Category, CategoryFormData } from "../types";
import { useCategoryApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@colony/core-api";
import { Box } from "@colony/core-theme";
import {
  ClickableModalWrapper,
  ExpoIcon,
  ExpoIconComponent,
  LocalExpoIconPicker,
  StyledButton,
  StyledInput,
} from "@colony/core-components";

type CategoriesFormProps = {
  category?: Category;
  onSuccess?: () => void;
};

const CategoriesForm: FC<CategoriesFormProps> = ({ category, onSuccess }) => {
  const { addCategory, updateCategory } = useCategoryApi();

  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name ?? "",
      icon: category?.icon,
      organizationId: category?.organizationId ?? undefined,
    },
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      if (category) {
        await updateCategory(category?.id, data);
      } else {
        await addCategory(data);
      }
      onSuccess?.();
      mutate("/categories");
    } catch (error) {
      const e = handleApiErrors<CategoryFormData>(error);
      if (e.detail) {
        console.log(__filename, error);
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof CategoryFormData, { message: val })
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
            label="Category"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="e.g Bungallow"
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
          <StyledInput
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
            label="Category icon"
            error={error?.message}
          />
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default CategoriesForm;

const styles = StyleSheet.create({});
