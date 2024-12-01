import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
} from "@colony/core-components";
import { Category } from "../types";
import { CategoriesForm } from "../forms";
import { useCategories } from "../hooks";
import { Box } from "@colony/core-theme";

const Categories = () => {
  const { categories, error, isLoading } = useCategories();

  const handleUpdateCategory = (category: Category) => {
    const dispose = showModal(
      <CategoriesForm onSuccess={() => dispose()} category={category} />,
      {
        title: "Update category",
      }
    );
  };

  const handleLaunchBottomsheet = (category: Category) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              handleUpdateCategory(category);
            }}
          />
          <StyledButton
            title="Delete"
            variant="outline"
            onPress={() => {
              dispose();
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${category.name} actions` }
    );
  };

  if (isLoading) {
    return (
      <Box gap={"m"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ListTileSkeleton key={index} />
        ))}
      </Box>
    );
  }
  return (
    <View style={styles.scrollable}>
      <FlatList
        style={styles.scrollable}
        data={categories}
        keyExtractor={(amenity) => amenity.id}
        renderItem={({ item }) => (
          <ListTile
            onPress={() => handleLaunchBottomsheet(item)}
            title={item.name}
            subtitle={item.icon.name}
            leading={<ExpoIconComponent {...(item.icon as any)} size={24} />}
            trailing={
              <ExpoIconComponent
                family="MaterialCommunityIcons"
                name="chevron-right"
                size={24}
              />
            }
            borderBottom
          />
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
