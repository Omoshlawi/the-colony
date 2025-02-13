import { Box, Text, useTheme } from "@colony/core-theme";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TextInput } from "../Input";
import { DimensionValue, FlatList, TouchableOpacity } from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";

export interface SelectionInputProps<TData, TValue> {
  data?: TData[];
  initialValue?: TData | TData[];
  keyExtractor?: (item: TData, index: number) => string;
  labelExtractor?: (item: TData) => string;
  valueExtractor: (item: TData) => TValue;
  renderItem?: (props: {
    item: TData;
    itemClicked: () => void;
    selected: boolean;
  }) => React.ReactNode;
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
  searchText?: string;
  onSearchTextChange?: (value: string) => void;
  onValueChange?: (value: TValue | TValue[]) => void;
  searchTextThreshold?: number;
  onItemSelected?: (item: TData | TData[]) => void;
  mode?: "dropdown" | "search";
  placeholder?: string;
}
// TODO Implement to allow accept form input externally as in Image pickers that trigers the dialog
const SelectionInput = <TData, TValue>({
  data = [],
  keyExtractor = (item, ind) => `${ind}`,
  renderItem,
  labelExtractor = (item) => JSON.stringify(item),
  height = "auto",
  maxHeight = 300,
  minHeight,
  searchText = "",
  onSearchTextChange,
  searchTextThreshold = 3,
  initialValue,
  onItemSelected,
  mode = "search",
  placeholder = "PLACEHOLDER TEXT HERE ...",
  valueExtractor,
  onValueChange,
}: SelectionInputProps<TData, TValue>) => {
  const theme = useTheme();
  const placeHolderValue = useMemo(() => {
    if (Array.isArray(initialValue) || !initialValue) {
      return placeholder;
    }
    return labelExtractor(initialValue);
  }, [initialValue, labelExtractor, placeholder]);
  const [dropDownExpanded, setDropDownExpanded] = useState(false);
  const value = useMemo(() => {
    if (!initialValue || mode === "search") {
      return searchText;
    }
    if (Array.isArray(initialValue)) {
      return initialValue?.map(labelExtractor).join(", ");
    }
    return labelExtractor(initialValue);
  }, [searchText, labelExtractor]);

  const showoptions = useMemo(() => {
    if (
      mode === "search" &&
      searchText?.length &&
      searchText.length >= searchTextThreshold
    ) {
      return true;
    }
    if (mode === "dropdown" && dropDownExpanded) {
      return true;
    }
    return false;
  }, [searchText, mode, dropDownExpanded]);
  const handleItemClicked = useCallback(
    (item: TData, selected: boolean) => {
      if (Array.isArray(initialValue)) {
        let curr = [...initialValue];
        if (!selected) curr.push(item);
        else
          curr = curr.filter((c) => valueExtractor(c) !== valueExtractor(item));
        onItemSelected?.(curr);
        onValueChange?.(curr.map(valueExtractor));
      } else {
        onItemSelected?.(item);
        onValueChange?.(valueExtractor(item));
      }
      onSearchTextChange?.("");
      setDropDownExpanded(false);
    },
    [
      initialValue,
      valueExtractor,
      onValueChange,
      onItemSelected,
      onSearchTextChange,
      setDropDownExpanded,
    ]
  );
  const defaultRenderItem = useCallback(
    (item: TData, selected: boolean) => (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => handleItemClicked(item, selected)}
        style={{
          padding: theme.spacing.s,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outline,
        }}
      >
        <Text color={"outline"} style={[selected && { fontWeight: "bold" }]}>
          {labelExtractor(item)}
        </Text>
      </TouchableOpacity>
    ),
    [handleItemClicked, labelExtractor, theme]
  );
  return (
    <Box>
      <TextInput
        label="Dropdown"
        value={value}
        onChangeText={onSearchTextChange}
        placeholder={placeHolderValue}
        autoCapitalize="none"
        autoCorrect={false}
        readOnly={mode === "dropdown"}
        helperText={`${showoptions}-${dropDownExpanded}`}
        suffixIcon={
          mode === "dropdown" && (
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name="chevron-down"
            />
          )
        }
        onSuffixIconPressed={() => setDropDownExpanded((exp) => !exp)}
      />
      {showoptions && (
        <Box width={"100%"}>
          <Box
            height={height}
            minHeight={minHeight}
            maxHeight={maxHeight}
            position={"absolute"}
            zIndex={"low"}
            width={"100%"}
            backgroundColor={"background"}
            p={"s"}
            // borderWidth={1}
            // borderColor={"outline"}
            shadowColor={"outline"}
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => {
                const isSelected = Array.isArray(initialValue)
                  ? initialValue.findIndex(
                      (v) => valueExtractor(v) === valueExtractor(item)
                    ) !== -1
                  : initialValue
                  ? valueExtractor(initialValue) === valueExtractor(item)
                  : false;
                if (typeof renderItem === "function")
                  return (
                    <>
                      {renderItem({
                        item,
                        itemClicked: () => handleItemClicked(item, isSelected),
                        selected: isSelected,
                      })}
                    </>
                  );
                return <>{defaultRenderItem(item, isSelected)}</>;
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SelectionInput;
