import {
  ErrorState,
  ExpoIcon,
  ExpoIconComponent,
  InputSkeleton,
  ListTile,
  SeachableDropDown,
  Textinput,
  When,
} from "@colony/core-components";
import { Box, Color, Text, useTheme } from "@colony/core-theme";
import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { useAttributeTypes } from "../hooks";
import { PropertyFormData } from "../types";

const PropertyFormAttributeField = () => {
  const atrtributeTypesAsync = useAttributeTypes();
  const theme = useTheme();
  const form = useFormContext<PropertyFormData>();
  const attrs = form.watch("attributes");
  const handleChange = useCallback(
    (data: PropertyFormData["attributes"]) => {
      form.setValue("attributes", data);
    },
    [form.setValue]
  );
  return (
    <When
      asyncState={{
        ...atrtributeTypesAsync,
        data: atrtributeTypesAsync.attributeTypes,
      }}
      loading={() => <InputSkeleton />}
      error={(e) => <ErrorState error={e} />}
      success={(attributeTypes) => (
        <Box gap={"s"} width={"100%"}>
          <Text color={"text"} variant={"bodyMedium"}>
            Property attributes
          </Text>
          {attrs?.map(({ attributeId, value }, index) => {
            return (
              <Box
                key={index}
                borderWidth={1}
                borderColor={"outline"}
                borderRadius={"small"}
                gap={"s"}
                padding={"s"}
                flexDirection={"row"}
                width={"100%"}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    zIndex: 1,
                  }}
                  onPress={() =>
                    handleChange(
                      attrs?.filter((_, index_) => {
                        return index !== index_;
                      }) ?? []
                    )
                  }
                >
                  <ExpoIconComponent
                    family="FontAwesome"
                    name="times-circle"
                    size={15}
                    color={theme.colors.error}
                  />
                </TouchableOpacity>
                <Box flex={1}>
                  <Controller
                    control={form.control}
                    name={`attributes.${index}.attributeId`}
                    render={({ field, fieldState }) => (
                      <SeachableDropDown
                        inputProps={{
                          label: "Attribute type",
                          placeholder: "Select attribute type",
                          error: fieldState?.error?.message,
                        }}
                        data={attributeTypes}
                        keyExtractor={(attributeType) => attributeType!.id}
                        labelExtractor={(attributeType) => attributeType!.name}
                        valueExtractor={(attributeType) => attributeType!.id}
                        onValueChange={field.onChange}
                        title="Select attribute type"
                        initialValue={attributeTypes.find(
                          (a) => a.id === field.value
                        )}
                        renderItem={({ item }) => (
                          <ListTile
                            title={item.name}
                            trailing={
                              <ExpoIconComponent {...(item.icon as ExpoIcon)} />
                            }
                          />
                        )}
                      />
                    )}
                  />
                </Box>
                <Box flex={1}>
                  <Controller
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field, fieldState: { error } }) => (
                      <Textinput
                        label="Attribute Value"
                        placeholder="Attribute value"
                        value={field.value}
                        onChangeText={field.onChange}
                        error={error?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            );
          })}
          <TouchableHighlight
            onPress={() => {
              handleChange([
                ...(form.getValues("attributes") ?? []),
                { attributeId: "", value: "" },
              ]);
            }}
            style={{
              width: "50%",
              borderRadius: theme.borderRadii.small,
              backgroundColor: theme.colors.hintColor,
              padding: theme.spacing.s,
            }}
            underlayColor={Color(theme.colors.hintColor).darken(0.1).toString()}
          >
            <Text textAlign={"center"} style={{ color: "white" }}>
              Add Attribute
            </Text>
          </TouchableHighlight>
        </Box>
      )}
    />
  );
};

export default PropertyFormAttributeField;

const styles = StyleSheet.create({});
