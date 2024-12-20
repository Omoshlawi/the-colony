import { handleApiErrors, mutate } from "@colony/core-api";
import {
  InputSkeleton,
  SeachableDropDown,
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { usePrivileges, useRolesApi } from "../hooks";
import { Role, RoleFormData } from "../types";
import { RoleSchema } from "../utils/validation";

type Props = {
  role?: Role;
  onSuccess?: () => void;
};

const RolesForm: FC<Props> = ({ onSuccess, role }) => {
  const { addRole, updateRole } = useRolesApi();
  const { error, isLoading, privileges } = usePrivileges();
  const form = useForm<RoleFormData>({
    defaultValues: {
      name: role?.name ?? "",
      description: role?.description ?? "",
      privileges: role?.privileges?.map(({ privilege: { id } }) => id) ?? [],
    },
    resolver: zodResolver(RoleSchema),
  });

  const onSubmit: SubmitHandler<RoleFormData> = async (data) => {
    try {
      if (role) {
        await updateRole(role?.id, data);
      } else {
        await addRole(data);
      }
      onSuccess?.();
      mutate("/roles");
      showSnackbar({
        title: "succes",
        subtitle: `role ${role ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<RoleFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RoleFormData, { message: val })
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
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <Controller
          control={form.control}
          name="privileges"
          render={({
            field: { onChange, value, disabled, onBlur, ref },
            fieldState: { error },
          }) => (
            <SeachableDropDown
              data={privileges}
              initialValue={value.map(
                (id) => privileges.find((privilege) => privilege.id === id)!
              )}
              multiple
              keyExtractor={({ id }) => id}
              labelExtractor={({ name }) => name}
              valueExtractor={({ id }) => id}
              placeholderText="Select privileges"
              onValueChange={onChange}
              title="Select privileges"
              inputProps={{ error: error?.message, label: "Privileges" }}
            />
          )}
        />
      )}

      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default RolesForm;

const styles = StyleSheet.create({});
