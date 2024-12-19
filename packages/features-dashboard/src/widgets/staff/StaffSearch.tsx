import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box } from "@colony/core-theme";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StyledInput,
} from "@colony/core-components";
import debounce from "lodash/debounce";
import { useStaff } from "../../hooks";
import { handleApiErrors } from "@colony/core-api";
import { OrganizationMembership } from "@/src/types";
import StaffList from "./StaffList";

const StaffSearch = () => {
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const { staffs, isLoading, error } = useStaff(filters);
  const handleSearch = debounce(async (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, 300); // 300ms delay to reduce unnecessary API calls

  return (
    <Box flex={1}>
      <StyledInput
        placeholder="Search staff..."
        onChangeText={handleSearch}
        helperText="Search by name,email or phone number"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <StaffList error={error} loading={isLoading} staffs={staffs} />
    </Box>
  );
};

export default StaffSearch;

const styles = StyleSheet.create({

});
