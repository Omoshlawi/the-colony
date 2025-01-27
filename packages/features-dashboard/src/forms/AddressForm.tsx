import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect } from "react";
import { Address, AddressFormData } from "../types";
import { useAddressApi, usePlaces } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@colony/core-api";
import {
  ErrorState,
  InputSkeleton,
  showSnackbar,
  Button,
  StyledInput,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import SearchableDropdown from "@colony/core-components/src/components/SelectionInput/SeachableDropDown";

type Props = {
  address?: Address;
  onSuccess?: () => void;
};

const AddressForm: FC<Props> = ({ address, onSuccess }) => {
  const { addAddress, updateAddress } = useAddressApi();
  const placesAsyncState = usePlaces({});
  const form = useForm<AddressFormData>({
    defaultValues: {
      name: address?.name ?? "",
      description: address?.description,
      county: address?.county ?? "",
      subCounty: address?.subCounty ?? "",
      landmark: address?.landmark ?? "",
      // latitude: address?.latitude ?? undefined,
      // longitude: address?.longitude ?? undefined,
      postalCode: address?.postalCode ?? undefined,
      village: address?.village ?? undefined,
      ward: address?.ward ?? "",
    },
    resolver: zodResolver(AddressSchema),
  });

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    try {
      if (address) {
        await updateAddress(address?.id, data);
      } else {
        await addAddress(data);
      }
      onSuccess?.();
      mutate("/addresses");
      showSnackbar({
        title: "succes",
        subtitle: `address ${address ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<AddressFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AddressFormData, { message: val })
        );
    }
  };
  const observableSelectedCounty = form.watch("county");
  const observableSelectedSubCounty = form.watch("subCounty");

  useEffect(() => {
    form.resetField("subCounty");
  }, [observableSelectedCounty, form.resetField]);

  useEffect(() => {
    form.resetField("ward");
  }, [observableSelectedSubCounty, form.resetField]);

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
            label="Address"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter name of address"
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
          <StyledInput
            value={value}
            label="Description"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Brief description of address"
            error={error?.message}
          />
        )}
      />
      <When
        asyncState={{ ...placesAsyncState, data: placesAsyncState.counties }}
        success={(data) => (
          <Controller
            control={form.control}
            name="county"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => {
              return (
                <SearchableDropdown
                  data={data}
                  initialValue={data.find(({ name }) => name === value)}
                  keyExtractor={({ name }) => name}
                  valueExtractor={({ name }) => name}
                  onValueChange={onChange}
                  inputProps={{ label: "County", error: error?.message }}
                  labelExtractor={({ name }) => name}
                />
              );
            }}
          />
        )}
        error={(e) => <ErrorState error={e} />}
        loading={() => <InputSkeleton />}
      />
      <When
        asyncState={{ ...placesAsyncState, data: placesAsyncState.counties }}
        success={(data) => {
          const subcounties =
            data.find(({ name }) => name === observableSelectedCounty)
              ?.subCounties ?? [];
          return (
            <Controller
              control={form.control}
              name="subCounty"
              render={({
                field: { onChange, value, disabled },
                fieldState: { error },
              }) => (
                <SearchableDropdown
                  data={subcounties}
                  valueExtractor={({ name }) => name}
                  initialValue={subcounties.find(({ name }) => name === value)}
                  keyExtractor={({ name }) => name}
                  onValueChange={onChange}
                  inputProps={{ label: "Subcounty", error: error?.message }}
                  labelExtractor={({ name }) => name}
                />
              )}
            />
          );
        }}
        error={(e) => <ErrorState error={e} />}
        loading={() => <InputSkeleton />}
      />
      <When
        asyncState={{ ...placesAsyncState, data: placesAsyncState.counties }}
        success={(data) => {
          const wards =
            data
              .find(({ name }) => name === observableSelectedCounty)
              ?.subCounties.find(
                ({ name }) => name === observableSelectedSubCounty
              )?.wards ?? [];
          return (
            <Controller
              control={form.control}
              name="ward"
              render={({
                field: { onChange, value, disabled },
                fieldState: { error },
              }) => (
                <SearchableDropdown
                  data={wards}
                  valueExtractor={({ name }) => name}
                  initialValue={wards.find(({ name }) => name === value)}
                  keyExtractor={({ name }) => name}
                  onValueChange={onChange}
                  inputProps={{ label: "Ward" }}
                  labelExtractor={({ name }) => name}
                />
              )}
            />
          );
        }}
        error={(e) => <ErrorState error={e} />}
        loading={() => <InputSkeleton />}
      />
      <Controller
        control={form.control}
        name="landmark"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Landmark"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter nearby school, building, e.t.c"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="postalCode"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Postal code"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter postal code"
            error={error?.message}
          />
        )}
      />

      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default AddressForm;

const styles = StyleSheet.create({});
