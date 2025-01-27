import { handleApiErrors, mutate } from "@colony/core-api";
import {
  ErrorState,
  ExpoIcon,
  ExpoIconComponent,
  InputSkeleton,
  ListTile,
  showSnackbar,
  Button,
  StyledInput,
  When,
  SeachableDropDown,
} from "@colony/core-components";
import { Box, useTheme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import {
  useAddresses,
  useAmenities,
  useAttributeTypes,
  useCategories,
  usePropertiesApi,
} from "../hooks";
import { Property, PropertyFormData } from "../types";
import { PropertySchema } from "../utils";
import PropertyFormAttributeField from "./PropertyFormAttributeField";
import PropertyFormThumbnailForm from "./PropertyFormThumbnailForm";

type Props = {
  property?: Property;
  onSuccess?: () => void;
};

const PropertyForm: FC<Props> = ({ onSuccess, property }) => {
  const { addProperty, updateProperty } = usePropertiesApi();
  const addressesAsync = useAddresses({});
  const amenitiesAsync = useAmenities();
  const categoriesAsync = useCategories();

  const form = useForm<PropertyFormData>({
    defaultValues: {
      categories: [],
      addressId: "",
      amenities: [],
      attributes: [],
      media: [],
      name: "",
      thumbnail: "",
    },
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    try {
      if (property) {
        await updateProperty(property?.id, data);
      } else {
        await addProperty(data);
      }
      onSuccess?.();
      showSnackbar({
        title: "succes",
        subtitle: `property ${property ? "updated" : "created"} succesfull`,
        kind: "success",
      });
      mutate("/properties");
    } catch (error) {
      const e = handleApiErrors<PropertyFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyFormData, { message: val })
        );
    }
  };

  return (
    <ScrollView>
      <FormProvider {...form}>
        <Box width={"100%"} gap={"m"} p={"m"}>
          <Controller
            control={form.control}
            name="name"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => (
              <StyledInput
                value={value}
                label="Name"
                readOnly={disabled}
                onChangeText={onChange}
                placeholder="Enter property name"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="addressId"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => (
              <When
                asyncState={{
                  ...addressesAsync,
                  data: addressesAsync.addresses,
                }}
                loading={() => <InputSkeleton />}
                error={(e) => <ErrorState error={e} />}
                success={(addresses) => (
                  <SeachableDropDown
                    inputProps={{
                      label: "Address",
                      placeholder: "Select address",
                      error: error?.message,
                    }}
                    data={addresses}
                    keyExtractor={(address) => address.id}
                    labelExtractor={(address) => address.name}
                    valueExtractor={(address) => address.id}
                    onValueChange={onChange}
                    title="Select address"
                    initialValue={addresses.find(
                      (address) => address.id === value
                    )}
                  />
                )}
              />
            )}
          />
          <Controller
            control={form.control}
            name="amenities"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => (
              <When
                asyncState={{
                  ...amenitiesAsync,
                  data: amenitiesAsync.amenities,
                }}
                loading={() => <InputSkeleton />}
                error={(e) => <ErrorState error={e} />}
                success={(amenities) => (
                  <SeachableDropDown
                    inputProps={{
                      label: "Amenities",
                      placeholder: "Select amenities",
                      error: error?.message,
                    }}
                    data={amenities}
                    keyExtractor={(amenity) => amenity!.id}
                    labelExtractor={(amenity) => amenity!.name}
                    valueExtractor={(amenity) => amenity!.id}
                    onValueChange={onChange}
                    title="Select amenities"
                    multiple
                    initialValue={(value ?? []).map((amenity) =>
                      amenities.find((am) => am.id === amenity)
                    )}
                    renderItem={({ item, selected }) => (
                      <Box
                        backgroundColor={selected ? "disabledColor" : undefined}
                      >
                        <ListTile
                          title={item?.name}
                          trailing={
                            <ExpoIconComponent {...(item!.icon as ExpoIcon)} />
                          }
                        />
                      </Box>
                    )}
                  />
                )}
              />
            )}
          />
          <Controller
            control={form.control}
            name="categories"
            render={({
              field: { onChange, value, disabled },
              fieldState: { error },
            }) => (
              <When
                asyncState={{
                  ...categoriesAsync,
                  data: categoriesAsync.categories,
                }}
                loading={() => <InputSkeleton />}
                error={(e) => <ErrorState error={e} />}
                success={(categories) => (
                  <SeachableDropDown
                    inputProps={{
                      label: "Categories",
                      placeholder: "Select categories",
                      error: error?.message,
                    }}
                    data={categories}
                    keyExtractor={(category) => category!.id}
                    labelExtractor={(category) => category!.name}
                    valueExtractor={(category) => category!.id}
                    onValueChange={onChange}
                    title="Select categories"
                    multiple
                    initialValue={(value ?? []).map((category) =>
                      categories.find((am) => am.id === category)
                    )}
                    renderItem={({ item, selected }) => (
                      <Box
                        backgroundColor={selected ? "disabledColor" : undefined}
                      >
                        <ListTile
                          title={item?.name}
                          trailing={
                            <ExpoIconComponent {...(item!.icon as ExpoIcon)} />
                          }
                        />
                      </Box>
                    )}
                  />
                )}
              />
            )}
          />
          <PropertyFormThumbnailForm />
          <PropertyFormAttributeField />

          <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
        </Box>
      </FormProvider>
    </ScrollView>
  );
};

export default PropertyForm;

const styles = StyleSheet.create({});
