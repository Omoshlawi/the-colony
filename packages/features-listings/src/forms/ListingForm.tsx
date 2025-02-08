import { getHiveFileUrl, handleApiErrors, mutate } from "@colony/core-api";
import {
  Button,
  DateTimePickerInput,
  ImageViewer,
  ListTile,
  showSnackbar,
  TextInput
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useListingApi } from "../hooks";
import { Listing, ListingFormData, Property } from "../types";
import { ListingSchema } from "../utils";

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
    },
    resolver: zodResolver(ListingSchema),
  });

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
    <Box width={"100%"} gap={"l"} p={"m"}>
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
        render={({ field: { value, onChange }, fieldState: { error } }) => (
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
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
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
