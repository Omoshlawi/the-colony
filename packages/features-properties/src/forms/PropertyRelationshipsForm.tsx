import { getHiveFileUrl, handleApiErrors, mutate } from "@colony/core-api";
import {
  Button,
  DateTimePickerInput,
  ErrorState,
  ImageViewer,
  InputSkeleton,
  ListTile,
  SeachableDropDown,
  showSnackbar,
  When,
} from "@colony/core-components";
import { Box, Color, useTheme } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { usePropertiesApi, useRelationshipTypes } from "../hooks";
import { Property, PropertyRelationshipFormData, Relationship } from "../types";
import { RelationshipSchema } from "../utils";

type Props = {
  property: Property;
  onSuccess?: (relationship: Relationship) => void;
  relationship?: Relationship;
};

const PropertyRelationshipsForm: FC<Props> = ({
  property,
  onSuccess,
  relationship,
}) => {
  const relationShipTypesAsync = useRelationshipTypes();
  const {
    searchProperty,
    addPropertiesRelationship,
    updatePropertiesRelationship,
  } = usePropertiesApi();
  const theme = useTheme();
  const form = useForm<PropertyRelationshipFormData>({
    defaultValues: {
      propertyAId: property.id,
      startDate: new Date(),
    },
    resolver: zodResolver(RelationshipSchema),
  });

  const onSubmit: SubmitHandler<PropertyRelationshipFormData> = async (
    data
  ) => {
    try {
      const res = relationship
        ? await updatePropertiesRelationship(relationship?.id, data)
        : await addPropertiesRelationship(data);

      onSuccess?.(res.data);
      showSnackbar({
        title: "succes",
        subtitle: `relationship ${
          relationship ? "updated" : "created"
        } succesfull`,
        kind: "success",
      });
      mutate("/relationships");
    } catch (error) {
      const e = handleApiErrors<PropertyRelationshipFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof PropertyRelationshipFormData, {
            message: val,
          })
        );
    }
  };
  return (
    <Box flex={1} p={"m"} gap={"s"}>
      <Box
        style={{
          backgroundColor: Color(theme.colors.hintColor).alpha(0.2).toString(),
        }}
      >
        <ListTile
          title={property.name}
          subtitle={new Date(property.createdAt).toLocaleDateString()}
          leading={
            <ImageViewer
              source={getHiveFileUrl(property.thumbnail)}
              style={styles.propertythumbnail}
            />
          }
        />
      </Box>
      <Controller
        control={form.control}
        name="typeId"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <When
            asyncState={{
              ...relationShipTypesAsync,
              data: relationShipTypesAsync.relationshipTypes,
            }}
            loading={() => <InputSkeleton />}
            error={(e) => <ErrorState error={e} />}
            success={(relationshipTypes) => (
              <SeachableDropDown
                inputProps={{
                  label: `Relationship to ${property.name}`,
                  placeholder: "Select relationship type",
                  error: error?.message,
                }}
                data={relationshipTypes}
                keyExtractor={(relationshiptype) => relationshiptype.id}
                labelExtractor={(relationshiptype) => relationshiptype.bIsToA}
                valueExtractor={(relationshiptype) => relationshiptype.id}
                onValueChange={onChange}
                title="Select relationship type"
                initialValue={relationshipTypes.find(
                  (relationshiptype) => relationshiptype.id === value
                )}
              />
            )}
          />
        )}
      />
      <Controller
        control={form.control}
        name="propertyBId"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <SeachableDropDown
          
            inputProps={{
              label: `Other Property`,
              placeholder: "search Property",
              error: error?.message,
            }}
            asyncSearchFunction={async (query) => {
              const res = await searchProperty({ search: query });
              return (res.data.results ?? []).filter(
                (i) => i.id !== property.id
              );
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
        name="startDate"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DateTimePickerInput
            date={value}
            onDateChanged={onChange}
            label="Start Date"
            placeholder={"dd/mm/yyyy"}
            mode="datetime"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="endDate"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DateTimePickerInput
            date={value}
            onDateChanged={onChange}
            label="End Date"
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

export default PropertyRelationshipsForm;

const styles = StyleSheet.create({
  propertythumbnail: {
    width: 50,
    aspectRatio: 1,
  },
});
