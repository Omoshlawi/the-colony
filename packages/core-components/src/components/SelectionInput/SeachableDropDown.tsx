import { Text, useTheme } from "@colony/core-theme";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ExpoIconComponent } from "../ExpoIcons";
import { Button } from "../Button";
import { TextInput, TextInputProps } from "../Input";

// Configuration types
interface DropdownProps<T, S> {
  inputProps?: TextInputProps;
  // Data and extraction props
  data?: T[];
  initialValue?: T | T[];
  keyExtractor?: (item: T) => string | number;
  labelExtractor?: (item: T) => string;
  valueExtractor?: (item: T) => S;

  // Mode configuration
  multiple?: boolean;

  // Styling props
  placeholderText?: string;
  searchPlaceholder?: string;
  title?: string;

  // Async search function
  asyncSearchFunction?: (query: string) => Promise<T[]>;

  // Render props
  renderItem?: (props: {
    item: T;
    index: number;
    selected?: boolean;
  }) => React.ReactElement;
  renderLoading?: () => React.ReactElement;
  renderError?: (error: Error) => React.ReactElement;

  // Callbacks
  onSelectItems?: (items: T | T[] | null) => void;
  onValueChange?: (value: S | S[] | null) => void;

  // Maximum number of selections for multi-select
  maxSelections?: number;
}

function SeachableDropDown<T, S>({
  data = [],
  initialValue,
  title,
  keyExtractor = (item: T) => JSON.stringify(item) as any,
  labelExtractor = (item: T) => JSON.stringify(item) as any,
  valueExtractor = (item: T) => JSON.stringify(item) as any,
  multiple = false,

  placeholderText = "Select an item",
  searchPlaceholder = "Search...",
  inputProps = {},

  asyncSearchFunction,

  renderItem,
  renderLoading,
  renderError,

  onSelectItems = () => {},
  onValueChange = () => {},

  maxSelections = Infinity,
}: DropdownProps<T, S>) {
  const theme = useTheme();
  // Determine initial selected items based on multiple flag
  const getInitialSelectedItems = (value?: T | T[] | null): T | T[] | null => {
    if (multiple) {
      // For multiple mode, ensure initialValue is an array or convert to array
      return value ? (Array.isArray(value) ? value : [value]) : [];
    } else {
      // For single mode, ensure initialValue is a single item or null
      return value && !Array.isArray(value) ? value : null;
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState<T | T[] | null>(
    getInitialSelectedItems()
  );

  // update selectedItems when initialValue changes
  useEffect(() => {
    setSelectedItems(getInitialSelectedItems(initialValue));
  }, [initialValue]);

  // Async search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [searchError, setSearchError] = useState<Error | null>(null);

  // Debounce ref for async search
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sync search logic
  const syncFilteredItems = useMemo(() => {
    return data.filter((item) =>
      labelExtractor(item).toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText, labelExtractor]);

  // Async search handler
  const handleAsyncSearch = useCallback(
    async (text: string) => {
      if (!asyncSearchFunction) return;

      // Clear previous timeout
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      // Debounce search
      searchTimeout.current = setTimeout(async () => {
        try {
          setIsSearching(true);
          setSearchError(null);

          const results = await asyncSearchFunction(text);
          setSearchResults(results);
          setIsSearching(false);
        } catch (error) {
          setSearchError(error as Error);
          setIsSearching(false);
        }
      }, 300);
    },
    [asyncSearchFunction]
  );

  // Search handler
  const handleSearch = (text: string) => {
    setSearchText(text);

    // Trigger async search if function provided
    if (typeof asyncSearchFunction === "function") {
      handleAsyncSearch(text);
    }
  };

  // Item selection handler
  const handleSelectItem = (item: T) => {
    if (multiple) {
      // Multi-select logic
      setSelectedItems((prev) => {
        const currentSelections = prev as T[];

        // Check if item is already selected
        const isSelected = currentSelections.some(
          (selectedItem) => keyExtractor(selectedItem) === keyExtractor(item)
        );

        if (isSelected) {
          // Remove if already selected
          const newSelections = currentSelections.filter(
            (selectedItem) => keyExtractor(selectedItem) !== keyExtractor(item)
          );

          onSelectItems(newSelections);
          if (typeof valueExtractor === "function")
            onValueChange(newSelections.map((item) => valueExtractor(item)));
          return newSelections;
        } else {
          // Add if not at max selections
          const newSelections =
            currentSelections.length < maxSelections
              ? [...currentSelections, item]
              : currentSelections;

          onSelectItems(newSelections);
          if (typeof valueExtractor === "function")
            onValueChange(newSelections.map((item) => valueExtractor(item)));
          return newSelections;
        }
      });
    } else {
      // Single select logic
      setSelectedItems(item);
      onSelectItems(item);
      if (typeof valueExtractor === "function")
        onValueChange(valueExtractor(item));
      setModalVisible(false);
    }
  };

  // Render selected items text
  const renderSelectedText = (): string => {
    if (!selectedItems) return "";

    if (multiple) {
      const multiSelectedItems = selectedItems as T[];
      return multiSelectedItems.length > 0
        ? multiSelectedItems.map((item) => labelExtractor(item)).join(", ")
        : "";
    }

    return selectedItems ? labelExtractor(selectedItems as T) : "";
  };

  // Default item renderer
  const defaultRenderItem = ({
    item,
    isSelected,
  }: {
    item: T;
    index: number;
    isSelected?: boolean;
  }) => {
    return (
      <>
        {multiple && (
          <View
            style={[
              styles.checkboxOuter,
              isSelected && { borderColor: theme.colors.outline },
            ]}
          >
            {isSelected && (
              <View
                style={[
                  styles.checkboxInner,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
            )}
          </View>
        )}
        <Text
          color={"outline"}
          style={[styles.itemText, isSelected && styles.selectedItemText]}
        >
          {labelExtractor(item)}
        </Text>
      </>
    );
  };
  // Custom item renderer
  const _renderItem = ({ item, index }: { item: T; index: number }) => {
    const isSelected = multiple
      ? (selectedItems as T[]).some(
          (selectedItem) => keyExtractor(selectedItem) === keyExtractor(item)
        )
      : selectedItems &&
        keyExtractor(selectedItems as T) === keyExtractor(item);

    return (
      <TouchableOpacity
        style={[
          typeof renderItem !== "function" && styles.itemContainer,
          typeof renderItem !== "function" && {
            padding: theme.spacing.m,
            borderBottomColor: theme.colors.disabledColor,
          },
          typeof renderItem !== "function" &&
            isSelected && { backgroundColor: theme.colors.disabledColor },
        ]}
        onPress={() => handleSelectItem(item)}
      >
        {typeof renderItem === "function"
          ? renderItem({ item, index, selected: isSelected ?? undefined })
          : defaultRenderItem({
              item,
              index,
              isSelected: isSelected ?? undefined,
            })}
      </TouchableOpacity>
    );
  };

  // Default loading and error renderers
  const defaultRenderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const defaultRenderError = (error: Error) => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>
        {error ? error.message : "An error occurred"}
      </Text>
    </View>
  );

  // Determine which items to render
  const itemsToRender = asyncSearchFunction
    ? isSearching
      ? []
      : searchResults
    : syncFilteredItems;

  return (
    <View style={styles.container}>
      {/* Dropdown Trigger */}
      <TextInput
        suffixIcon={
          <ExpoIconComponent family="Feather" name="chevron-down" size={24} />
        }
        onSuffixIconPressed={() => setModalVisible(true)}
        {...inputProps}
        onPress={() => setModalVisible(true)}
        readOnly
        value={renderSelectedText()}
        placeholder={placeholderText}
      />

      {/* Modal Dropdown */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                margin: theme.spacing.xl,
                backgroundColor: theme.colors.background,
                borderRadius: theme.borderRadii.medium,
                padding: theme.spacing.m,
                gap: theme.spacing.m,
              },
            ]}
          >
            {/* Dialog title */}
            {title && (
              <Text color={"outline"} variant={"bodyLarge"} fontWeight={"700"}>
                {title}
              </Text>
            )}
            {/* Search Input */}
            <TextInput
              placeholder={searchPlaceholder}
              value={searchText}
              onChangeText={handleSearch}
              suffixIcon={<ExpoIconComponent family="Feather" name="search" />}
            />

            {/* Conditional Rendering */}
            {isSearching && asyncSearchFunction ? (
              renderLoading ? (
                renderLoading()
              ) : (
                defaultRenderLoading()
              )
            ) : searchError ? (
              renderError ? (
                renderError(searchError)
              ) : (
                defaultRenderError(searchError)
              )
            ) : (
              <FlatList<T>
                data={itemsToRender}
                keyExtractor={(item) => String(keyExtractor(item))}
                renderItem={_renderItem}
                ListEmptyComponent={() => (
                  <Text color={"outline"} p={"xl"} style={styles.emptyText}>
                    No items found
                  </Text>
                )}
              />
            )}

            {/* Confirm Button for Multi-Select */}
            {multiple && (
              <Button
                onPress={() => setModalVisible(false)}
                title={`Confirm Selection (${
                  (selectedItems as T[])?.length || 0
                })`}
                variant="primary"
              />
            )}

            {/* Close Button */}

            <Button
              variant="tertiary"
              onPress={() => setModalVisible(false)}
              title="Close"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    maxHeight: "80%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  selectedItemText: {
    fontWeight: "bold",
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxInner: {
    width: 10,
    height: 10,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
  },
});

export default SeachableDropDown;
