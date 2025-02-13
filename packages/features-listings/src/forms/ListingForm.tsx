import { getHiveFileUrl, handleApiErrors, mutate } from "@colony/core-api";
import {
  Button,
  DateTimePickerInput,
  ImageViewer,
  ListTile,
  SeachableDropDown,
  showSnackbar,
  TextInput,
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useMemo } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { useListingApi } from "../hooks";
import { Listing, ListingFormData, Property } from "../types";
import { ListingSchema } from "../utils";
import RentalListingFormSection from "./RentalListingFormSection";
import SaleslistingFormSection from "./SaleslistingFormSection";
import LeaseListingFormSection from "./LeaseListingFormSection";
import AuctionlistingFormSection from "./AuctionlistingFormSection";

type Props = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  property: Property;
};
const ListingForm: FC<Props> = ({ listing, onSuccess, property }) => {
  const { addListing, updateListing, searchProperty } = useListingApi();
  const theme = useTheme();
  const form = useForm<ListingFormData>({
    defaultValues: {
      title: listing?.title,
      description: listing?.description,
      expiryDate: listing?.expiryDate,
      featured: listing?.featured,
      tags: listing?.tags ?? [],
      price: listing?.price ? Number(listing.price) : undefined,
      propertyId: property.id,
      types: [],
    },
    resolver: zodResolver(ListingSchema),
  });
  const ltypesObservable = form.watch("types");
  const listingType = useMemo(
    () => [
      { value: "rent", label: "Rental" },
      { value: "sale", label: "Sales" },
      { value: "lease", label: "Lease" },
      { value: "auction", label: "Auction" },
    ],
    []
  );

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    try {
      const res = listing
        ? await updateListing(listing?.id, data)
        : await addListing(data);
      onSuccess?.(res.data);
      mutate("/listings");
      showSnackbar({
        title: "succes",
        subtitle: `listings ${listing ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<ListingFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof ListingFormData, { message: val })
        );
    }
  };
  return (
    <Box width={"100%"}>
      <ScrollView>
        <FormProvider {...form}>
          <Box gap={"l"} p={"m"}>
            <Controller
              control={form.control}
              name="propertyId"
              render={({ fieldState: { error } }) => (
                <Box
                  style={{
                    backgroundColor: Color(theme.colors.hintColor)
                      .alpha(0.2)
                      .toString(),
                  }}
                >
                  <ListTile
                    title={property.name}
                    subtitle={property.address?.landmark}
                    leading={
                      <ImageViewer
                        source={getHiveFileUrl(property.thumbnail)}
                        style={styles.propertythumbnail}
                      />
                    }
                  />
                  {error?.message && (
                    <Text color={"error"} p={"m"}>
                      {error?.message}
                    </Text>
                  )}
                </Box>
              )}
            />
            <Controller
              control={form.control}
              name="types"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <SeachableDropDown
                  inputProps={{
                    label: "Listing types",
                    placeholder: "Select listing type",
                    error: error?.message,
                  }}
                  data={listingType}
                  multiple
                  keyExtractor={(lType) => lType.value}
                  labelExtractor={(lType) => lType.label}
                  valueExtractor={(lType) => lType.value}
                  onValueChange={onChange}
                  title="Listing types"
                  initialValue={listingType.filter((lType) =>
                    value.includes(lType.value as any)
                  )}
                />
              )}
            />
            <Controller
              control={form.control}
              name="title"
              render={({
                field: { onChange, value, disabled },
                fieldState: { error },
              }) => (
                <TextInput
                  value={value}
                  label="Listing title"
                  readOnly={disabled}
                  onChangeText={onChange}
                  placeholder="Enter amenity name"
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
                <TextInput
                  multiline
                  numberOfLines={2}
                  value={value}
                  label="Description"
                  readOnly={disabled}
                  onChangeText={onChange}
                  placeholder="Enter property description"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="price"
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
              name="expiryDate"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DateTimePickerInput
                  date={value}
                  onDateChanged={onChange}
                  label="Expiry Date"
                  placeholder={"dd/mm/yyyy"}
                  mode="datetime"
                  error={error?.message}
                />
              )}
            />

            {ltypesObservable.includes("rent") && <RentalListingFormSection />}
            {ltypesObservable.includes("sale") && <SaleslistingFormSection />}
            {ltypesObservable.includes("lease") && <LeaseListingFormSection />}
            {ltypesObservable.includes("auction") && (
              <AuctionlistingFormSection />
            )}

            <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
          </Box>
        </FormProvider>
      </ScrollView>
    </Box>
  );
};

export default ListingForm;

const styles = StyleSheet.create({
  propertythumbnail: {
    width: 50,
    aspectRatio: 1,
  },
});
