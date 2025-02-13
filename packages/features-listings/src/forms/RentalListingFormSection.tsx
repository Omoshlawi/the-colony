import {
  Checkbox,
  DateTimePickerInput,
  SeachableDropDown,
  TextInput,
} from "@colony/core-components";
import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ListingFormData } from "../types";
import { Text } from "@colony/core-theme";

const RentalListingFormSection = () => {
  const form = useFormContext<Pick<ListingFormData, "rentalDetails">>();
  const periods = useMemo(() => ["Monthly", "Weekly", "Daily", "Yearly"], []);
  return (
    <React.Fragment>
      <Controller
        control={form.control}
        name="rentalDetails.securityDeposit"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <TextInput
            value={`${value ?? 0}`}
            label="Price"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter amenity name"
            error={error?.message}
            helperText={`Price in Ksh`}
          />
        )}
      />
      <Controller
        control={form.control}
        name="rentalDetails.rentPeriod"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <SeachableDropDown
            inputProps={{
              label: "Rent period",
              placeholder: "rent period",
              error: error?.message,
            }}
            data={periods}
            keyExtractor={(period) => period}
            labelExtractor={(period) => period}
            valueExtractor={(period) => period}
            onValueChange={onChange}
            title="Rental periods"
            initialValue={periods.find((lType) => value === lType)}
          />
        )}
      />
      <Controller
        control={form.control}
        name="rentalDetails.minimumRentalPeriod"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <TextInput
            value={`${value ?? 0}`}
            label="Minimum rental period"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter minimu rental period"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="rentalDetails.availableFrom"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DateTimePickerInput
            date={value}
            onDateChanged={onChange}
            label="Available from"
            placeholder={"dd/mm/yyyy"}
            mode="date"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="rentalDetails.utilities"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => <Text>Placeholder</Text>}
      />
      <Controller
        control={form.control}
        name="rentalDetails.furnished"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <Checkbox value={value} onValueChange={onChange} label="Furnished?" />
        )}
      />
      <Controller
        control={form.control}
        name="rentalDetails.petsAllowed"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <Checkbox
            value={value}
            onValueChange={onChange}
            label="Pets allowed?"
          />
        )}
      />
    </React.Fragment>
  );
};

export default RentalListingFormSection;

const styles = StyleSheet.create({});
