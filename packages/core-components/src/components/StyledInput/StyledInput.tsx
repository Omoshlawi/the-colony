import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import { inputStyles } from "./inputStyles";
import { Box, Text, useTheme } from "@colony/core-theme";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  suffixIcon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  prefixIcon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  onPrefixIconPressed?: () => void;
  onSuffixIconPressed?: () => void;
}

const StyledInput: FC<Props> = ({
  label,
  error,
  style,
  helperText,
  prefixIcon,
  suffixIcon,
  onPrefixIconPressed,
  onSuffixIconPressed,

  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    colors: { hintColor, text, icon },
  } = useTheme();
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
        // flex={1}
        flexDirection={"row"}
        gap={"s"}
        alignItems={"center"}
      >
        {prefixIcon && (
          <TouchableOpacity onPress={onPrefixIconPressed}>
            <Ionicons {...suffixIcon} />
          </TouchableOpacity>
        )}
        <TextInput
          {...props}
          style={[inputStyles, style, { color: text, flexGrow: 1 }]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={hintColor}
          cursorColor={text}
        />
        {suffixIcon && (
          <TouchableOpacity onPress={onSuffixIconPressed}>
            <Ionicons {...suffixIcon} color={icon} />
          </TouchableOpacity>
        )}
      </Box>
      {error && (
        <Text variant={"bodySmall"} color={"error"}>
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text variant={"bodySmall"} color={"hintColor"}>
          {helperText}
        </Text>
      )}
    </Box>
  );
};

export default StyledInput;
