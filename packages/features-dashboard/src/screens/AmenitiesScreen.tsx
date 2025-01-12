import {
  AppBar,
  EmptyState,
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
  TouchableOpacity,
} from "react-native";
import { AmenitiesForm } from "../forms";
import { useAmenities } from "../hooks";
import { Amenity } from "../types";

const AmenitiesScreen = () => {
  const amenitiesAsync = useAmenities();
  const handleUpdate = (amenity: Amenity) => {
    const dispose = showModal(
      <AmenitiesForm amenity={amenity} onSuccess={() => dispose()} />,
      { title: "Update amenity" }
    );
  };

  const handleLaunchBottomsheet = (amenity: Amenity) => {
    const dispose = showModalBottomSheet(
      <ScrollView>
        <Box gap={"s"} p={"m"}>
          <StyledButton
            title="Update"
            variant="outline"
            onPress={() => {
              handleUpdate(amenity);
            }}
          />
          <StyledButton
            title="Delete"
            variant="outline"
            onPress={() => {
              dispose();
              handleUpdate;
            }}
          />
        </Box>
      </ScrollView>,
      { title: `${amenity.name} actions` }
    );
  };
  const handleAddAmenity = () => {
    const dispose = showModal(<AmenitiesForm onSuccess={() => dispose()} />, {
      title: "Add amenity",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Amenities"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddAmenity}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <When
          asyncState={{ ...amenitiesAsync, data: amenitiesAsync.amenities }}
          error={(error) => <ErrorState error={error} />}
          loading={() => (
            <Box gap={"m"}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ListTileSkeleton key={index} />
              ))}
            </Box>
          )}
          success={(amenities) => {
            if (amenities.length === 0) {
              return <EmptyState message="No amenities" />;
            }
            return (
              <FlatList
                style={styles.scrollable}
                data={amenities}
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

export default AmenitiesScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
