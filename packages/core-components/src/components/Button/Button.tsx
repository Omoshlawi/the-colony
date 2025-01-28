import { Color, Text, Theme, theme } from "@colony/core-theme";
import React, { FC, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
type Variant = "primary" | "secondary" | "tertiary" | "ghost";
interface StyledButtonProps {
  title: string;
  variant?: Variant;
  onPress?: () => void;
  borderRadius?: keyof Theme["borderRadii"];
  renderIcon?: (props: { color: string; size: number }) => React.ReactNode;
  iconLeading?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button: FC<StyledButtonProps> = ({
  title,
  variant = "primary",
  onPress,
  borderRadius = "small",
  renderIcon,
  iconLeading = true,
  labelStyle,
  style,
}) => {
  const colors = useMemo(() => {
    if (variant === "primary")
      return {
        backgroundColor: theme.colors.primary,
        underlayColor: Color(theme.colors.primary).darken(0.1).toString(),
        color: "white",
      };
    else if (variant === "secondary")
      return {
        backgroundColor: theme.colors.hintColor,
        underlayColor: Color(theme.colors.hintColor).darken(0.1).toString(),
        color: "white",
      };
    else if (variant === "tertiary")
      return {
        backgroundColor: "transparent",
        underlayColor: Color(theme.colors.primary).alpha(0.1).toString(),
        color: theme.colors.primary,
      };
    else
      return {
        backgroundColor: "transparent",
        underlayColor: Color(theme.colors.primary).alpha(0.1).toString(),
        color: theme.colors.primary,
      };
  }, [variant]);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.btn,
        {
          padding: theme.spacing.m,
          borderRadius: borderRadius && theme.borderRadii[borderRadius],
          backgroundColor: colors.backgroundColor,
          gap: theme.spacing.s,
          flexDirection: iconLeading ? "row" : "row-reverse",
        },
        variant === "tertiary" && {
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
      underlayColor={colors.underlayColor}
    >
      <>
        {typeof renderIcon === "function" &&
          renderIcon({ color: colors.color, size: 18 })}
        <Text
          textAlign={"center"}
          style={[{ color: colors.color }, labelStyle]}
          fontWeight={"700"}
          variant={"bodyLarge"}
        >
          {title}
        </Text>
      </>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
