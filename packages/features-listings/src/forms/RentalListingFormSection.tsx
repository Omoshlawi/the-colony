import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ListingFormData } from "../types";
import { TextInput } from "@colony/core-components";

const RentalListingFormSection = () => {
  const form = useFormContext<Pick<ListingFormData, "rentalDetails">>();
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
    </React.Fragment>
  );
};

export default RentalListingFormSection;

const styles = StyleSheet.create({});
