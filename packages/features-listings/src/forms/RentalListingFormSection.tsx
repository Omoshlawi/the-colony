import { TextInput } from "@colony/core-components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ListingFormData } from "../types";

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
