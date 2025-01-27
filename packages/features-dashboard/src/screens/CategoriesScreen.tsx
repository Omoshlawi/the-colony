import {
  AppBar,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  showModalBottomSheet,
  StyledButton,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { CategoriesForm } from "../forms";
import { useCategories } from "../hooks";
import { Category } from "../types";

const CategoriesScreen = () => {
  const categoriesAsync = useCategories();

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
            variant="tertiary"
            onPress={() => {
              handleUpdateCategory(category);
            }}
          />
          <StyledButton
            title="Delete"
            variant="tertiary"
            onPress={() => {
              dispose();
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${category.name} actions` }
    );
  };
  const handleAddCategory = () => {
    const dispose = showModal(<CategoriesForm onSuccess={() => dispose()} />, {
      title: "Add category",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Categories"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddCategory}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />

      <Box flex={1} p={"m"}>
        <When
          asyncState={{ ...categoriesAsync, data: categoriesAsync.categories }}
          error={(error) => <ErrorState error={error} />}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          success={(categories) => {
            return (
              <FlatList
                style={styles.scrollable}
                data={categories}
                keyExtractor={(amenity) => amenity.id}
                renderItem={({ item }) => (
                  <ListTile
                    onPress={() => handleLaunchBottomsheet(item)}
                    title={item.name}
                    subtitle={item.icon.name}
                    leading={
                      <ExpoIconComponent {...(item.icon as any)} size={24} />
                    }
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
            );
          }}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
