import { getHiveFileUrl, handleApiErrors, mutate } from "@colony/core-api";
import {
  Button,
  DateTimePickerInput,
  ExpoIconComponent,
  ImageViewer,
  ListTile,
  SeachableDropDown,
  showModal,
  showSnackbar,
  TextInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { Property, PropertyForm } from "@colony/features-properties";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useListingApi } from "../hooks";
import { Listing, ListingFormData } from "../types";
import { ListingSchema } from "../utils";

type Props = {
  listing?: Listing;
  onSuccess?: (listing: Listing) => void;
  property?: Property;
};
const ListingForm: FC<Props> = ({ listing, onSuccess, property }) => {
  const { addListing, updateListing, searchProperty } = useListingApi();
  const [newProperty, setNewProperty] = useState<Property>();

  const form = useForm<ListingFormData>({
    defaultValues: {
      title: listing?.title,
      description: listing?.description,
      expiryDate: listing?.expiryDate,
      featured: listing?.featured,
      tags: listing?.tags ?? [],
      price: listing?.price ? Number(listing.price) : undefined,
      propertyId: property?.id ?? listing?.propertyId,
    },
    resolver: zodResolver(ListingSchema),
  });
  const handleAddProperty = useCallback(() => {
    const dispose = showModal(
      <PropertyForm
        onSuccess={(other) => {
          form.setValue("propertyId", other.id);
          setNewProperty(other);
          dispose();
        }}
      />,
      {
        title: "Add listing property",
      }
    );
  }, [form, setNewProperty]);
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
        name="propertyId"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <SeachableDropDown
            inputProps={{
              label: `Listing Property`,
              placeholder: "Search Property",
              error: error?.message,
              prefixIcon: (
                <ExpoIconComponent family="MaterialIcons" name="add-business" />
              ),
              onPrefixIconPressed: handleAddProperty,
            }}
            initialValue={newProperty ?? listing?.property ?? property}
            asyncSearchFunction={async (query) => {
              const res = await searchProperty({ search: query });
              return res.data.results ?? [];
            }}
            keyExtractor={(relationshiptype) => relationshiptype.id}
            labelExtractor={(relationshiptype) => relationshiptype.name}
            valueExtractor={(relationshiptype) => relationshiptype.id}
            onValueChange={onChange}
            title="Search other property"
            renderItem={({ item, selected }) => (
              <ListTile
                title={item.name}
                subtitle={item.address?.landmark}
                leading={
                  <ImageViewer
                    source={getHiveFileUrl(item.thumbnail)}
                    style={styles.propertythumbnail}
                  />
                }
              />
            )}
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
