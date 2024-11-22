import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import { inputStyles } from "./inputStyles";
import { Box, Text } from "@colony/core-theme";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

const StyledInput: FC<Props> = ({
  label,
  error,
  style,
  helperText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  return (
    <Box gap={"s"} mb={"s"}>
      {label && (
        <Text variant={"bodyMedium"} color={"text"}>
          {label}
        </Text>
      )}
      <Box
        borderWidth={isFocused ? 2 : 1}
        borderRadius={"small"}
        padding={"m"}
        borderColor={error ? "error" : isFocused ? "primary" : "outline"}
      >
        <TextInput
          {...props}
          style={[inputStyles, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Box>
      {error && (
        <Text variant={"labelSmall"} color={"error"}>
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text variant={"bodySmall"} color={"text"}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};

export default StyledInput;
