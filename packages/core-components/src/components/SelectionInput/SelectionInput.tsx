import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import { Box, useTheme } from "@colony/core-theme";
import { debounce } from "lodash";
import { Textinput } from "../Textinput";
import { ExpoIconComponent } from "../ExpoIcons";

type SelectionInputProps<T> = {
  onSelect?: (selected?: T) => void;
  onSearch?: (searchText: string) => Promise<T[]>;
  placeholder?: string;
  renderItem: (item: T, index?: number) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  keyExtractor?: (item: T, index?: number) => string;
};

const SelectionInput = <T,>({
  onSearch,
  onSelect,
  placeholder = "Search...",
  renderItem,
  renderLoading,
  renderError,
  keyExtractor,
}: SelectionInputProps<T>) => {
  const ref = useRef<TextInput>(null);
  const theme = useTheme();

  const [searchText, setSearchText] = useState<string>("");
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = debounce(async (search: string) => {
    if (typeof onSearch === "function") {
      setIsLoading(true);
      try {
        const searchResults = await onSearch(search);
        setItems(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, 300);

  const handleTextChange = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  const handleSelect = (selected: T, index?: number) => {
    onSelect?.(selected);
    setSearchText("");
    setItems([]);
  };
  return (
    <Box width={"100%"} flex={1} padding={"m"}>
      <Textinput
        ref={ref}
        value={searchText}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        suffixIcon={<ExpoIconComponent family="Feather" name="search" />}
      />
      {isLoading &&
        (typeof renderLoading === "function" ? (
          <>{renderLoading()}</>
        ) : (
          <Text>Loading...</Text>
        ))}

      {!isLoading && items.length > 0 && (
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ index, item }) => (
            <TouchableOpacity onPress={() => handleSelect(item, index)}>
              {renderItem(item, index)}
            </TouchableOpacity>
          )}
        />
      )}
    </Box>
  );
};

export default SelectionInput;
