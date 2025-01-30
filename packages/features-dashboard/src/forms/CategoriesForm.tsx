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
import { useCategoryApi } from "../hooks";
import { Category, CategoryFormData } from "../types";
import { CategorySchema } from "../utils/validation";

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
      showSnackbar({
        title: "succes",
        subtitle: `category ${category ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<CategoryFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
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
          <TextInput
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
            label="Category icon"
            error={error?.message}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default CategoriesForm;

const styles = StyleSheet.create({});
