import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  AppBar,
  ExpoIconComponent,
  showModal,
  StyledPageLayout,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { AddressBook } from "../widgets";
import { AddressForm } from "../forms";

const AddressBookScreen = () => {
  const handleAdd = () => {
    const dispose = showModal(<AddressForm onSuccess={() => dispose()} />, {
      title: "Add address",
    });
  };
  return (
    <StyledPageLayout>
      <AppBar
        title="Address Book"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
        <AddressBook />
      </Box>
    </StyledPageLayout>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({});
