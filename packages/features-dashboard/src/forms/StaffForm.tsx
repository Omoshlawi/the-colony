import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect } from "react";
import {
  OrganizationMembership,
  OrganizationMembershipFormData,
} from "../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationMembershipSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@colony/core-api";
import {
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { useOrganizationMembershipApi, useRoles, useUserApi } from "../hooks";
import { Box } from "@colony/core-theme";
import SearchableDropdown from "@colony/core-components/src/components/SelectionInput/SeachableDropDown";

type Props = {
  membership?: OrganizationMembership;
  onSuccess?: () => void;
};

const StaffForm: FC<Props> = ({ membership, onSuccess }) => {
  const { addOrganizationMembership, updateOrganizationMembership } =
    useOrganizationMembershipApi();
  const { searchUser } = useUserApi();
  const { error, isLoading, roles } = useRoles();
  const form = useForm<OrganizationMembershipFormData>({
    defaultValues: {
      memberUserId: membership?.memberUserId ?? "",
      roleIds: [],
    },
    resolver: zodResolver(OrganizationMembershipSchema),
  });

  const onSubmit: SubmitHandler<OrganizationMembershipFormData> = async (
    data
  ) => {
    try {
      if (membership) {
        await updateOrganizationMembership(membership?.id, data);
      } else {
        await addOrganizationMembership(data);
      }
      onSuccess?.();
      mutate("/organization-membership");
      showSnackbar({
        title: "succes",
        subtitle: `membership ${membership ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<OrganizationMembershipFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else {
        Object.entries(e).forEach(([key, val]) => {
          if (OrganizationMembershipSchema.keyof().options.includes(key as any))
            form.setError(key as keyof OrganizationMembershipFormData, {
              message: val,
            });
          else {
            showSnackbar({ title: key, subtitle: val, kind: "error" });
          }
        });
      }
    }
  };

  return (
    <Box width={"100%"} gap={"l"} p={"m"}>
      <Controller
        control={form.control}
        name="memberUserId"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <>
            <SearchableDropdown
              label="User"
              asyncSearchFunction={async (query: string) => {
                const res = await searchUser(query);
                return res.data.results;
              }}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.username}
              valueExtractor={(item) => item.id}
              placeholderText="search user"
              onValueChange={onChange}
              title="Select User"
              inputProps={{ error: error?.message }}
            />
          </>
        )}
      />
      <Controller
        control={form.control}
        name="roleIds"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <>
            <SearchableDropdown
              label="Roles"
              data={roles}
              keyExtractor={(item) => item.id}
              multiple
              labelExtractor={(item) => item.name}
              valueExtractor={(item) => item.id}
              placeholderText="search Roles"
              onValueChange={onChange}
              title="Select roles"
              inputProps={{ error: error?.message }}
            />
          </>
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default StaffForm;

const styles = StyleSheet.create({});
