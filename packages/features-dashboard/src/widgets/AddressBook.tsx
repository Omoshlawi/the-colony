import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ActionsBottomSheet,
  ErrorState,
  ExpansionTile,
  ListTile,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import { useAddresses } from "../hooks";
import { Box } from "@colony/core-theme";
import { AddressForm } from "../forms";

const AddressBook = () => {
  const addressState = useAddresses({});
  return (
    <When
      asyncState={{ ...addressState, data: addressState.addresses }}
      error={(error) => <ErrorState error={error} />}
      loading={() => (
        <Box gap={"m"}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ListTileSkeleton key={idx} />
          ))}
        </Box>
      )}
      success={(data) => (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <ActionsBottomSheet
              title={item.name}
              renderForm={(dispose) => (
                <AddressForm onSuccess={dispose} address={item} />
              )}
              formTitle="Update Address"
            >
              <ExpansionTile title={item.name} subtitle={item.description}>
                <ListTile
                  title={item.county}
                  subtitle={item.subCounty}
                  borderBottom
                />
                <ListTile
                  title={item.village}
                  subtitle={item.landmark}
                  borderBottom
                />
              </ExpansionTile>
            </ActionsBottomSheet>
          )}
        />
      )}
    />
  );
};

export default AddressBook;

const styles = StyleSheet.create({});
