import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { OrganizationMembership } from "@/src/types";
import {
  EmptyState,
  ErrorState,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
} from "@colony/core-components";
import { handleApiErrors } from "@colony/core-api";
import { Box } from "@colony/core-theme";

type StaffListProps = {
  staffs?: OrganizationMembership[];
  loading?: boolean;
  error?: any;
  onEndReached?: () => void;
  onPress?: (staff: OrganizationMembership) => void;
};
const StaffList: React.FC<StaffListProps> = ({
  error,
  loading = false,
  staffs = [],
  onEndReached,
}) => {
  if (loading)
    return (
      <Box flex={1}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <ListTileSkeleton key={idx} />
        ))}
      </Box>
    );

  if (error)
    return (
      <ErrorState
        message={`${error?.message}`}
        detail={handleApiErrors(error)?.detail}
      />
    );
  if (!staffs.length) return <EmptyState />;

  return (
    <FlatList
      data={staffs}
      keyExtractor={({ id }) => id}
      style={styles.scrollable}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
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
      )}
    />
  );
};

export default StaffList;

const styles = StyleSheet.create({
  scrollable: {
    flex: 1,
  },
});
