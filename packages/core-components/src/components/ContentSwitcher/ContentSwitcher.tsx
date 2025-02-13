import { StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { Box, Color, Text, useTheme } from "@colony/core-theme";

type Props<TItem, TItemValue> = {
  items?: Array<TItem>;
  initialValue?: TItem;
  onChange?: (value: TItem) => void;
  valueExtractor: (iten: TItem) => TItemValue;
  labelExtractor?: (item: TItem) => string;
  onValueChange?: (value: TItemValue) => void;
};

const ContentSwitcher = <TItem, TItemValue>({
  items = [],
  labelExtractor,
  valueExtractor,
  initialValue,
  onChange,
  onValueChange,
}: Props<TItem, TItemValue>) => {
  // TODO Implement assert in core utils and use to asset eith render switch or label extractor
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      alignItems={"center"}
      borderWidth={1}
      borderColor={"outline"}
      flexDirection={"row"}
      borderRadius={"medium"}
      style={{ padding: 2 }}
    >
      {items.map((item, index) => {
        const selected =
          initialValue && valueExtractor(item) === valueExtractor(initialValue);
        return (
          <TouchableHighlight
            key={`${valueExtractor?.(item)}-${index}`}
            style={{
              flex: 1,
              backgroundColor: selected
                ? Color(theme.colors.primary).alpha(0.1).toString()
                : undefined,
              alignItems: "center",
              justifyContent: "center",
              padding: theme.spacing.s,
              borderRadius: theme.borderRadii.small,
            }}
            underlayColor={Color(theme.colors.primary).alpha(0.1).toString()}
            onPress={() => {
              onChange?.(item);
              onValueChange?.(valueExtractor(item));
            }}
          >
            <Text color={"text"} textAlign={"center"} verticalAlign={"middle"}>
              {labelExtractor ? labelExtractor(item) : JSON.stringify(item)}
            </Text>
          </TouchableHighlight>
        );
      })}
    </Box>
  );
};

export default ContentSwitcher;

const styles = StyleSheet.create({});
