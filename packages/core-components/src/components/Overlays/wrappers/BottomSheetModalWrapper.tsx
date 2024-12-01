import { Text, useTheme } from "@colony/core-theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, PropsWithChildren } from "react";
import { DimensionValue, Pressable, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
  height?: DimensionValue;
}>;

const BottomSheetModalWrapper: FC<Props> = ({
  children,
  title,
  onClose,
  height = "25%",
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.modalContent,
        {
          height: height,
          backgroundColor: theme.colors.skeleton, //"#25292e",
          borderTopRightRadius: theme.borderRadii.large,
          borderTopLeftRadius: theme.borderRadii.large,
        },
      ]}
    >
      <View
        style={[
          styles.titleContainer,
          {
            backgroundColor: theme.colors.onSkeleton, // "#464C55",
            borderTopRightRadius: theme.borderRadii.large,
            borderTopLeftRadius: theme.borderRadii.large,
            paddingHorizontal: theme.spacing.m,
          },
        ]}
      >
        <Text variant={"titleMedium"} color="text" p={"m"}>
          {title}
        </Text>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" color={theme.colors.icon} size={22} />
        </Pressable>
      </View>
      {children}
    </View>
  );
};

export default BottomSheetModalWrapper;

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
