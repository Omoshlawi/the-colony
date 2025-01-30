import { handleApiErrors, mutate } from "@colony/core-api";
import {
  InputSkeleton,
  SeachableDropDown,
  showSnackbar,
  Button,
  Textinput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useResources } from "../hooks";
import usePrivilegeApi from "../hooks/usePrivilegesApi";
import { Privilege, PrivilegeFormData } from "../types";
import { PrivilegeSchema } from "../utils/validation";

type Props = {
  privilege?: Privilege;
  onSuccess?: () => void;
};
const PrivilegeForm: FC<Props> = ({ privilege, onSuccess }) => {
  const { addPrivilege, updatePrivilege } = usePrivilegeApi();
  const { error, isLoading, resources } = useResources();
  const form = useForm<PrivilegeFormData>({
    defaultValues: {
      name: privilege?.name ?? "",
      operations: privilege?.operations ?? [],
      description: privilege?.description ?? "",
      resourceId: privilege?.resourceId ?? "",
      permitedResourceDataPoints: privilege?.permitedResourceDataPoints ?? [],
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

  const observableSelectedResouseId = form.watch("resourceId");
  const selectedResourseDatapoints =
    resources.find((r) => r.id === observableSelectedResouseId)?.dataPoints ??
    [];

  useEffect(() => {
    form.resetField("permitedResourceDataPoints");
  }, [observableSelectedResouseId]);

  return (
    <Box width={"100%"} gap={"l"} p={"m"}>
      <Controller
        control={form.control}
        name="name"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <Textinput
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
          <Textinput
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
          name="resourceId"
          render={({
            field: { onChange, value, disabled, onBlur, ref },
            fieldState: { error },
          }) => (
            <SeachableDropDown
              data={resources}
              initialValue={resources.find((r) => r.id === value)}
              keyExtractor={({ id }) => id}
              labelExtractor={({ name }) => name}
              valueExtractor={({ id }) => id}
              placeholderText="Select resource"
              onValueChange={onChange}
              title="Select resource"
              inputProps={{ error: error?.message, label: "Resource" }}
            />
          )}
        />
      )}
      <Controller
        control={form.control}
        name="permitedResourceDataPoints"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <SeachableDropDown
            data={selectedResourseDatapoints}
            multiple
            initialValue={value}
            keyExtractor={(field) => field}
            labelExtractor={(field) => field}
            valueExtractor={(field) => field}
            placeholderText="Select resource datapoints"
            onValueChange={onChange}
            title="Select resource datapoints"
            inputProps={{ error: error?.message, label: "Resource datapoints" }}
          />
        )}
      />
      <Controller
        control={form.control}
        name="operations"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <SeachableDropDown
            data={["Create", "Read", "Update", "Delete"]}
            multiple
            initialValue={value}
            keyExtractor={(field) => field}
            labelExtractor={(field) => field}
            valueExtractor={(field) => field}
            placeholderText="Select  operations"
            onValueChange={onChange}
            title="Select operations"
            inputProps={{ error: error?.message, label: "Operations" }}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default PrivilegeForm;

const styles = StyleSheet.create({});
