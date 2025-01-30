import { Box, Text, useTheme } from "@colony/core-theme";
import React, { forwardRef, ReactNode, Ref, useState } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from "react-native";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  onPrefixIconPressed?: () => void;
  onSuffixIconPressed?: () => void;
  height?: number;
  disabled?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      style,
      helperText,
      prefixIcon,
      suffixIcon,
      onPrefixIconPressed,
      onSuffixIconPressed,
      height = 50,
      disabled = false,
      ...props
    },
    ref: Ref<RNTextInput>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();
    const {
      colors: { hintColor, text, icon },
      spacing,
    } = theme;

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <Box style={{ width: "100%" }} gap={"s"}>
        {label && (
          <Text variant={"bodyMedium"} color={disabled ? "hintColor" : "text"}>
            {label}
          </Text>
        )}
        <Box
          borderWidth={isFocused ? 2 : 1}
          borderRadius={"small"}
          borderColor={
            error
              ? "error"
              : isFocused
              ? "primary"
              : disabled
              ? "hintColor"
              : "outline"
          }
          flexDirection={"row"}
          alignItems={"center"}
          height={height * (props.numberOfLines ?? 1)} // Fixed height to prevent layout shifts
          width={"100%"}
        >
          {prefixIcon && (
            <TouchableOpacity
              onPress={onPrefixIconPressed}
              style={{
                paddingHorizontal: spacing.s,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {prefixIcon}
            </TouchableOpacity>
          )}
          <RNTextInput
            ref={ref}
            editable={!disabled && props.editable}
            readOnly={disabled || props.readOnly}
            {...props}
            style={[
              {
                flex: 1,
                color: disabled ? hintColor : text,
                paddingVertical: spacing.s,
                paddingHorizontal: spacing.m,
                height: "100%",
              },
              Platform.OS === "web" && ({ outlineStyle: "none" } as any),
              style,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={hintColor}
            cursorColor={text}
          />
          {suffixIcon && (
            <TouchableOpacity
              onPress={onSuffixIconPressed}
              style={{
                paddingHorizontal: spacing.s,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {suffixIcon}
            </TouchableOpacity>
          )}
        </Box>
        {(error || helperText) && (
          <Text
            variant={"bodySmall"}
            color={error ? "error" : "hintColor"}
            style={{ marginTop: theme.spacing.s }}
          >
            {error || helperText}
          </Text>
        )}
      </Box>
    );
  }
);

export default TextInput;
