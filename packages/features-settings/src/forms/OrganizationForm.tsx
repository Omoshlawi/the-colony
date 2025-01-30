import { handleApiErrors, mutate } from "@colony/core-api";
import { showSnackbar, Button, Textinput } from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMyOrganizationApi } from "../hooks";
import { Organization, OrganizationFormData } from "../types";
import { OrganizationSchema } from "../utils";

type Props = {
  onSuccess?: () => void;
  organization?: Organization;
};

export const OrganizationForm: FC<Props> = ({ onSuccess, organization }) => {
  const { addMyOrganization, updateMyOrganization } = useMyOrganizationApi();
  const form = useForm<OrganizationFormData>({
    defaultValues: {
      name: organization?.name ?? "",
      description: organization?.description,
    },
    resolver: zodResolver(OrganizationSchema),
  });

  const onSubmit: SubmitHandler<OrganizationFormData> = async (data) => {
    try {
      if (organization) {
        await updateMyOrganization(organization?.id, data);
      } else {
        await addMyOrganization(data);
      }

      onSuccess?.();
      mutate("/organization-membership");
      showSnackbar({
        title: "succes",
        subtitle: `organization ${
          organization ? "updated" : "created"
        } succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<OrganizationFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof OrganizationFormData, { message: val })
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
          <Textinput
            value={value}
            label="Organization"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter organization name"
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
          <Textinput
            value={value}
            label="Description"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter organization description"
            error={error?.message}
          />
        )}
      />

      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};
