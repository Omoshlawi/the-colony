import { Box, Text, useTheme } from "@colony/core-theme";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { FC, useState, type ComponentProps } from "react";
import {
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity
} from "react-native";

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
    spacing,
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
        borderColor={error ? "error" : isFocused ? "primary" : "outline"}
        flex={1}
        flexDirection={"row"}
        alignItems={"center"}
      >
        {prefixIcon && (
          <TouchableOpacity
            onPress={onPrefixIconPressed}
            style={{ marginLeft: spacing.s }}
          >
            <Ionicons {...prefixIcon} color={icon} />
          </TouchableOpacity>
        )}
        <TextInput
          {...props}
          style={[
            style,
            {
              color: text,
              flexGrow: 1,
              paddingVertical: spacing.m,
              paddingLeft: prefixIcon ? spacing.s : spacing.m,
              paddingRight: suffixIcon ? spacing.s : spacing.m,
            },
            Platform.OS === "web" && ({ outlineStyle: "none" } as any),
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={hintColor}
          cursorColor={text}
        />
        {suffixIcon && (
          <TouchableOpacity
            onPress={onSuffixIconPressed}
            style={{ marginRight: spacing.s }}
          >
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
