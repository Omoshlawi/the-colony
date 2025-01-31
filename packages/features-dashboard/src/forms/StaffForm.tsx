import { handleApiErrors, mutate } from "@colony/core-api";
import {
  ExpoIconComponent,
  InputSkeleton,
  ListTile,
  showSnackbar,
  Button,
  TextInput,
  SeachableDropDown,
} from "@colony/core-components";
import { Box, useTheme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useOrganizationMembershipApi, useRoles, useUserApi } from "../hooks";
import {
  OrganizationMembership,
  OrganizationMembershipFormData,
} from "../types";
import { OrganizationMembershipSchema } from "../utils/validation";

type Props = {
  membership?: OrganizationMembership;
  onSuccess?: (membershi: OrganizationMembership) => void;
};

const StaffForm: FC<Props> = ({ membership, onSuccess }) => {
  const { addOrganizationMembership, updateOrganizationMembership } =
    useOrganizationMembershipApi();
  const { searchUser } = useUserApi();
  const { error, isLoading, roles } = useRoles();
  const theme = useTheme();
  const form = useForm<OrganizationMembershipFormData>({
    defaultValues: {
      memberUserId: membership?.memberUserId ?? "",
      roleIds: membership?.membershipRoles?.map((role) => role.roleId) ?? [],
    },
    resolver: zodResolver(OrganizationMembershipSchema),
  });

  const onSubmit: SubmitHandler<OrganizationMembershipFormData> = async (
    data
  ) => {
    try {
      const res = membership
        ? await updateOrganizationMembership(membership?.id, data)
        : await addOrganizationMembership(data);

      onSuccess?.(res.data);
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
            {!!!membership ? (
              <SeachableDropDown
                asyncSearchFunction={async (query: string) => {
                  const res = await searchUser(query);
                  return res.data.results;
                }}
                keyExtractor={(item) => item.id}
                labelExtractor={(item) => item.username}
                valueExtractor={(item) => item.id}
                renderItem={({ item, selected }) => (
                  <Box backgroundColor={selected ? "disabledColor" : undefined}>
                    <ListTile
                      title={item.username}
                      subtitle={item?.person?.email}
                      leading={
                        <ExpoIconComponent
                          family="FontAwesome6"
                          name="user"
                          size={24}
                        />
                      }
                      trailing={
                        <ExpoIconComponent
                          family="FontAwesome6"
                          name="chevron-right"
                          size={15}
                        />
                      }
                      borderBottom
                    />
                  </Box>
                )}
                placeholderText="search user"
                onValueChange={onChange}
                title="Select User"
                inputProps={{ error: error?.message, label: "User" }}
              />
            ) : (
              <TextInput
                error={error?.message}
                label="User"
                value={membership.memberUser?.username}
                disabled
                suffixIcon={
                  <ExpoIconComponent
                    family="Feather"
                    name="chevron-down"
                    size={24}
                    color={theme.colors.hintColor}
                  />
                }
              />
            )}
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
            {!isLoading ? (
              <SeachableDropDown
                data={roles}
                keyExtractor={(item) => item.id}
                multiple
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.id}
                placeholderText="search Roles"
                onValueChange={onChange}
                title="Select roles"
                inputProps={{ error: error?.message, label: "Roles" }}
                initialValue={roles.filter((role) => value.includes(role.id))}
              />
            ) : (
              <InputSkeleton />
            )}
          </>
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default StaffForm;

const styles = StyleSheet.create({});
