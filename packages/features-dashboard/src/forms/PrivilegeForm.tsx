import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Privilege, PrivilegeFormData } from "../types";
import usePrivilegeApi from "../hooks/usePrivilegesApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrivilegeSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@colony/core-api";
import {
  ExpoIconComponent,
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";

type Props = {
  privilege?: Privilege;
  onSuccess?: () => void;
};
const PrivilegeForm: FC<Props> = ({ privilege, onSuccess }) => {
  const { addPrivilege, updatePrivilege } = usePrivilegeApi();
  const form = useForm<PrivilegeFormData>({
    defaultValues: {
      name: "",
      operations: [],
      description: "",
      resourceId: "",
      permitedResourceDataPoints: [],
    },
    resolver: zodResolver(PrivilegeSchema),
  });

  const onSubmit: SubmitHandler<PrivilegeFormData> = async (data) => {
    try {
      if (privilege) {
        await updatePrivilege(privilege?.id, data);
      } else {
        await addPrivilege(data);
      }
      onSuccess?.();
      mutate("/privileges");
      showSnackbar({
        title: "succes",
        subtitle: `privilege ${privilege ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<PrivilegeFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PrivilegeFormData, { message: val })
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
            label="Privilege"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter privilege name"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter privilege description"
            label="Description"
            error={error?.message}
          />
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default PrivilegeForm;

const styles = StyleSheet.create({});
