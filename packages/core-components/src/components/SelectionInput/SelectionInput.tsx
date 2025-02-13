import { Box, Text, useTheme } from "@colony/core-theme";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TextInput } from "../Input";
import {
  DimensionValue,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  BackHandler,
  Platform,
} from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";

/**
 * Props for the generic SelectionInput component
 * @template TData The type of data items in the selection list
 * @template TValue The type of the selected value(s)
 */
export interface SelectionInputProps<TData, TValue> {
  /** Array of data items to be displayed in the selection list */
  data?: TData[];
  /** Initial selected value(s) - can be single item or array */
  initialValue?: TData | TData[];
  /** Function to extract unique key for each item */
  keyExtractor?: (item: TData, index: number) => string;
  /** Function to extract display label from each item */
  labelExtractor?: (item: TData) => string;
  /** Custom render function for list items */
  renderItem?: (props: {
    item: TData;
    itemClicked: () => void;
  }) => React.ReactNode;
  /** Height of the dropdown container */
  height?: DimensionValue;
  /** Maximum height of the dropdown container */
  maxHeight?: DimensionValue;
  /** Minimum height of the dropdown container */
  minHeight?: DimensionValue;
  /** Current search text value */
  searchText?: string;
  /** Callback fired when search text changes */
  onSearchTextChange?: (value: string) => void;
  /** Minimum number of characters required to show search results */
  searchTextThreshold?: number;
  /** Callback fired when an item is selected */
  onItemSelected?: (item: TData) => void;
  /** Input mode - either 'dropdown' or 'search' */
  mode?: "dropdown" | "search";
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Optional style prop for container */
  style?: any;
}

/**
 * A flexible selection input component for React Native that supports both
 * dropdown and search modes with customizable rendering and selection behavior.
 *
 * @example
 * ```tsx
 * // Basic usage with string array
 * <SelectionInput
 *   data={['Apple', 'Banana', 'Orange']}
 *   onItemSelected={(item) => console.log(item)}
 * />
 *
 * // With custom data type
 * interface User { id: number; name: string; }
 * <SelectionInput<User, number>
 *   data={users}
 *   keyExtractor={(item) => item.id.toString()}
 *   labelExtractor={(item) => item.name}
 *   mode="dropdown"
 * />
 * ```
 */
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
  placeholder = "Select an item...",
  style,
}: SelectionInputProps<TData, TValue>) => {
  const theme = useTheme();
  const [dropDownExpanded, setDropDownExpanded] = useState(false);

  // Handle back button press on Android
  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (dropDownExpanded) {
            setDropDownExpanded(false);
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }
  }, [dropDownExpanded]);

  // Memoize the placeholder value based on initial value
  const placeholderValue = useMemo(() => {
    if (Array.isArray(initialValue) || !initialValue) {
      return placeholder;
    }
    return labelExtractor(initialValue);
  }, [initialValue, labelExtractor, placeholder]);

  // Memoize the display value based on mode and initial value
  const displayValue = useMemo(() => {
    if (!initialValue || mode === "search") {
      return searchText;
    }
    if (Array.isArray(initialValue)) {
      return initialValue.map(labelExtractor).join(", ");
    }
    return labelExtractor(initialValue);
  }, [initialValue, searchText, labelExtractor, mode]);

  // Determine if options should be shown
  const showOptions = useMemo(() => {
    if (mode === "search") {
      return searchText?.length >= searchTextThreshold;
    }
    return mode === "dropdown" && dropDownExpanded;
  }, [searchText, searchTextThreshold, mode, dropDownExpanded]);

  // Handle item selection
  const handleItemClicked = useCallback(
    (item: TData) => {
      onSearchTextChange?.("");
      onItemSelected?.(item);
      setDropDownExpanded(false);
    },
    [onSearchTextChange, onItemSelected]
  );

  // Default item renderer
  const defaultRenderItem: ListRenderItem<TData> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => handleItemClicked(item)}
        style={{
          padding: theme.spacing.s,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outline,
        }}
      >
        <Text color={"outline"}>{labelExtractor(item)}</Text>
      </TouchableOpacity>
    ),
    [handleItemClicked, labelExtractor, theme]
  );

  return (
    <Box style={style}>
      <TextInput
        label="Selection"
        value={displayValue}
        onChangeText={onSearchTextChange}
        placeholder={placeholderValue}
        autoCapitalize="none"
        autoCorrect={false}
        readOnly={mode === "dropdown"}
        suffixIcon={
          mode === "dropdown" && (
            <ExpoIconComponent
              family="MaterialCommunityIcons"
              name={dropDownExpanded ? "chevron-up" : "chevron-down"}
            />
          )
        }
        onSuffixIconPressed={() => setDropDownExpanded((prev) => !prev)}
      />
      {showOptions && (
        <Box width="100%">
          <Box
            height={height}
            minHeight={minHeight}
            maxHeight={maxHeight}
            position="absolute"
            zIndex="low"
            width="100%"
            backgroundColor="background"
            p="s"
            shadowColor="outline"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => (
                <>
                  {renderItem?.({
                    item,
                    itemClicked: () => handleItemClicked(item),
                  }) ?? defaultRenderItem({ item } as any)}
                </>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SelectionInput;
