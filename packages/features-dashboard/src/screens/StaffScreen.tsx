import {
  ActionsBottomSheet,
  AppBar,
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  Textinput,
  StyledPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import debounce from "lodash/debounce";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { StaffForm } from "../forms";
import { useStaff } from "../hooks";

const StaffScreen = () => {
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const staffsAsync = useStaff(filters);
  const handleSearch = debounce(async (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, 300); // 300ms delay to reduce unnecessary API calls

  const handleAddStaff = () => {
    const dispose = showModal(<StaffForm onSuccess={() => dispose()} />, {
      title: "Add Staff",
    });
  };

  return (
    <StyledPageLayout>
      <AppBar
        title="Staff"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAddStaff}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <Textinput
          placeholder="Search staff..."
          onChangeText={handleSearch}
          helperText="Search by name,email or phone number"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        <When
          asyncState={{ ...staffsAsync, data: staffsAsync.staffs }}
          loading={() => (
            <Box flex={1}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <ListTileSkeleton key={idx} />
              ))}
            </Box>
          )}
          success={(staffs) => {
            if (!staffs.length) return <EmptyState />;
            return (
              <FlatList
                data={staffs}
                keyExtractor={({ id }) => id}
                style={styles.scrollable}
                // onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                  <ActionsBottomSheet
                    title={`${item.memberUser?.username} actions`}
                    renderForm={(dispose) => (
                      <StaffForm membership={item} onSuccess={dispose} />
                    )}
                  >
                    <ListTile
                      title={item.memberUser.username}
                      subtitle={`${item.memberUser.person.email}`}
                      leading={
                        <ExpoIconComponent
                          family="FontAwesome6"
                          name="user"
                          color="orange"
                        />
                      }
                      trailing={
                        <ExpoIconComponent
                          family="FontAwesome6"
                          name="chevron-right"
                          size={20}
                        />
                      }
                      borderBottom
                    />
                  </ActionsBottomSheet>
                )}
              />
            );
          }}
          error={(error) => <ErrorState error={error} />}
        />
      </Box>
    </StyledPageLayout>
  );
};

export default StaffScreen;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
