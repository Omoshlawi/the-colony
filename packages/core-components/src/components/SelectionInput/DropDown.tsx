import { Box, Text, useTheme } from "@colony/core-theme";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInputProps } from "../Input";

// TODO Move to core utils
// Type utilities for deep path access
type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

// Get the type of a value at a given path
type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

type Props<TData extends Record<string, any>, TValue> = Pick<
  TextInputProps,
  | "prefixIcon"
  | "onPrefixIconPressed"
  | "suffixIcon"
  | "onSuffixIconPressed"
  | "label"
  | "disabled"
  | "error"
  | "helperText"
> & {
  data?: TData[];
  searchable?: boolean;
  renderItem?: (item: TData, selected?: boolean) => React.ReactElement;
  mode?: "auto" | "default" | "modal";
  labelAccessorKey: Path<TData>;
  valueAccessorKey: Path<TData>;
  searchAccessorKey?: Path<TData>;
  onSelectedItemChange?: (item: TData & { _index: number }) => void;
  selectedItem?: TData;
};

const DropDown = <TData extends Record<string, any>, TValue>({
  data = [],
  prefixIcon,
  onPrefixIconPressed,
  searchable = false,
  onSuffixIconPressed,
  suffixIcon,
  label,
  disabled,
  error,
  helperText,
  renderItem,
  mode,
  labelAccessorKey,
  valueAccessorKey,
  onSelectedItemChange = (item) => {},
  selectedItem,
}: Props<TData, TValue>) => {
  const theme = useTheme();
  return (
    <Box width={"100%"} gap={"s"}>
      {label && (
        <Text variant={"bodyMedium"} color={disabled ? "hintColor" : "text"}>
          {label}
        </Text>
      )}
      <Dropdown
        disable={disabled}
        flatListProps={{ style: { backgroundColor: "transparent" } }}
        style={[
          styles.dropdown,
          {
            borderColor: theme.colors.outline,
            borderRadius: theme.borderRadii.small,
            padding: theme.spacing.s,
            gap: theme.spacing.s,
          },
        ]}
        placeholderStyle={{
          ...theme.textVariants.bodyMedium,
          fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          color: theme.colors.hintColor,
        }}
        selectedTextStyle={{
          ...theme.textVariants.bodyMedium,
          fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          color: theme.colors.text,
        }}
        renderItem={renderItem}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {
            ...theme.textVariants.bodyMedium,
            fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          },
        ]}
        searchPlaceholderTextColor={theme.colors.hintColor}
        iconStyle={[styles.iconStyle]}
        mode={mode}
        iconColor={theme.colors.icon}
        data={data}
        search={searchable}
        maxHeight={300}
        labelField={labelAccessorKey as string | number | symbol}
        valueField={valueAccessorKey as string | number | symbol}
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selectedItem}
        onChange={(item: TData & { _index: number }) => {
          onSelectedItemChange?.(item);
        }}
        renderLeftIcon={
          prefixIcon
            ? () => (
                <TouchableOpacity onPress={onPrefixIconPressed}>
                  {prefixIcon}
                </TouchableOpacity>
              )
            : undefined
        }
        renderRightIcon={
          suffixIcon
            ? () => (
                <TouchableOpacity onPress={onSuffixIconPressed}>
                  {suffixIcon}
                </TouchableOpacity>
              )
            : undefined
        }
      />
      {(error || helperText) && (
        <Text variant={"bodySmall"} color={error ? "error" : "hintColor"}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
