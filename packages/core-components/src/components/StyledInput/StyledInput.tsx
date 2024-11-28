import { Box, Text, useTheme } from "@colony/core-theme";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { FC, useState, type ComponentProps } from "react";
import {
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  suffixIcon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  prefixIcon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  onPrefixIconPressed?: () => void;
  onSuffixIconPressed?: () => void;
  height?: number;
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
  height = 50,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
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
    <View style={{ width: "100%" }}>
      {label && (
        <Text
          variant={"bodyMedium"}
          color={"text"}
          style={{ marginBottom: theme.spacing.s }}
        >
          {label}
        </Text>
      )}
      <Box
        borderWidth={isFocused ? 2 : 1}
        borderRadius={"small"}
        borderColor={error ? "error" : isFocused ? "primary" : "outline"}
        flexDirection={"row"}
        alignItems={"center"}
        height={height} // Fixed height to prevent layout shifts
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
            <Ionicons {...prefixIcon} color={icon} />
          </TouchableOpacity>
        )}
        <TextInput
          {...props}
          style={[
            {
              flex: 1,
              color: text,
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
            <Ionicons {...suffixIcon} color={icon} />
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
    </View>
  );
};

export default StyledInput;
