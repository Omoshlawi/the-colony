import React, { FC, useCallback, useMemo, useState } from "react";
import { Box, Text, useTheme } from "@colony/core-theme";
import {
  DimensionValue,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput } from "../Input";
import { ExpoIconComponent } from "../ExpoIcons";

// Improved type definitions
export interface SelectionInputProps<TData, TValue> {
  data?: TData[];
  item?: TData | TData[];
  onItemChange?: (item: TData | TData[]) => void;
  keyExtractor?: (item: TData, index: number) => string;
  labelExtractor?: (item: TData) => string;
  valueExtractor: (item: TData) => TValue;
  renderItem?: (props: {
    item: TData;
    onSelect: () => void;
    isSelected: boolean;
  }) => React.ReactNode;
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  minHeight?: DimensionValue;
  searchText?: string;
  onSearchTextChange?: (value: string) => void;
  onValueChange?: (value: TValue | TValue[]) => void;
  searchThreshold?: number;
  multiple?: boolean;
  mode?: "dropdown" | "search";
  placeholder?: string;
  disabled?: boolean;
}

const SelectionInput = <TData, TValue>({
  data = [],
  item,
  keyExtractor = (_, index) => index.toString(),
  labelExtractor = (item) => JSON.stringify(item),
  valueExtractor,
  renderItem,
  height = "auto",
  maxHeight = 300,
  minHeight,
  searchText = "",
  onSearchTextChange,
  searchThreshold = 3,
  onValueChange,
  multiple = false,
  mode = "search",
  placeholder = "Select an option...",
  disabled = false,
  onItemChange,
}: SelectionInputProps<TData, TValue>) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const placeHolderValue = useMemo(() => {
    if (multiple || !item) {
      return placeholder;
    }
    return labelExtractor(item as TData);
  }, [item, labelExtractor, placeholder]);
  // Memoized computations

  const displayValue = useMemo(() => {
    if (!item || mode === "search") {
      return searchText;
    }
    if (multiple) {
      return (item as TData[])?.map(labelExtractor).join(", ");
    }
    return labelExtractor(item as TData);
  }, [searchText, labelExtractor]);
  const showOptions = useMemo(() => {
    if (disabled) return false;
    if (mode === "search") {
      return searchText.length >= searchThreshold;
    }
    return isExpanded;
  }, [searchText, mode, isExpanded, disabled, searchThreshold]);

  // Handlers
  const handleSelect = useCallback(
    (_item: TData) => {
      if (multiple) {
        const currentValue = (item as TData[]) || [];
        const isSelected = currentValue.some(
          (v) => valueExtractor(v) === valueExtractor(_item)
        );

        const newValue = isSelected
          ? currentValue.filter(
              (v) => valueExtractor(v) !== valueExtractor(_item)
            )
          : [...currentValue, _item];
        onItemChange?.(newValue);
        onValueChange?.(newValue.map(valueExtractor));
      } else {
        onItemChange?.(_item);
        onValueChange?.(valueExtractor(_item));
        setIsExpanded(false);
        if (onSearchTextChange) onSearchTextChange("");
      }
    },
    [item, multiple, valueExtractor, onValueChange, onSearchTextChange]
  );

  const renderOptionItem: ListRenderItem<TData> = useCallback(
    ({ item: _item }) => {
      const isSelected = multiple
        ? ((item as TData[]) || []).some(
            (v) => valueExtractor(v) === valueExtractor(_item)
          )
        : item
        ? valueExtractor(item as TData) === valueExtractor(_item)
        : false;

      if (renderItem) {
        return (
          <>
            {renderItem({
              item: _item,
              onSelect: () => handleSelect(_item),
              isSelected,
            })}
          </>
        );
      }

      return (
        <TouchableOpacity
          style={[styles.option, { borderBottomColor: theme.colors.outline }]}
          activeOpacity={0.7}
          onPress={() => handleSelect(_item)}
        >
          <Text
            color={"text"}
            style={[styles.optionText, isSelected && styles.selectedOptionText]}
          >
            {labelExtractor(_item)}
          </Text>
        </TouchableOpacity>
      );
    },
    [item, multiple, valueExtractor, labelExtractor, handleSelect, renderItem]
  );

  return (
    <Box>
      <TextInput
      
        value={mode === "search" ? searchText : displayValue}
        onChangeText={onSearchTextChange}
        placeholder={placeHolderValue}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled && mode === "search"}
        suffixIcon={
          mode === "dropdown" && (
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              disabled={disabled}
            >w
              <ExpoIconComponent
                family="MaterialCommunityIcons"
                name={isExpanded ? "chevron-up" : "chevron-down"}
              />
            </TouchableOpacity>
          )
        }
      />
      {showOptions && (
        <Box
          height={height}
          minHeight={minHeight}
          maxHeight={maxHeight}
          position={"absolute"}
          zIndex={"low"}
          width={"100%"}
          top={"100%"}
          left={0}
          right={0}
          backgroundColor={"background"}
          p={"s"}
          // borderWidth={1}
          // borderColor={"outline"}
          shadowColor={"outline"}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
          borderRadius={"small"}
          style={{ zIndex: 1000 }}
        >
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderOptionItem}
            style={{
              height,
              maxHeight,
              minHeight,
            }}
            keyboardShouldPersistTaps="handled"
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  option: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
});

export default SelectionInput;
