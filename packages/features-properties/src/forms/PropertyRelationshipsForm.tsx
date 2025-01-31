import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Property, PropertyRelationshipFormData } from "../types";
import { useRelationshipTypes } from "../hooks";
import { Box, Color, useTheme } from "@colony/core-theme";
import {
  ErrorState,
  ImageViewer,
  InputSkeleton,
  ListTile,
  SeachableDropDown,
  When,
} from "@colony/core-components";
import { getHiveFileUrl } from "@colony/core-api";
import { Controller, useForm } from "react-hook-form";
import { RelationshipSchema } from "../utils";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  property: Property;
  onSuccess?: () => void;
};

const PropertyRelationshipsForm: FC<Props> = ({ property, onSuccess }) => {
  const relationShipTypesAsync = useRelationshipTypes();
  const theme = useTheme();
  const form = useForm<PropertyRelationshipFormData>({
    defaultValues: {
      propertyAId: property.id,
      startDate: new Date(),
      
    },
    resolver: zodResolver(RelationshipSchema),
  });
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
