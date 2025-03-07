import {
  ActionsBottomSheet,
  AppBar,
  EmptyState,
  ErrorState,
  ExpansionTile,
  ExpoIconComponent,
  ListTile,
  ListTileSkeleton,
  showModal,
  ThemedPageLayout,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AddressForm } from "../forms";
import { useAddresses } from "../hooks";

const AddressBookScreen = () => {
  const addressState = useAddresses({});

  const handleAdd = () => {
    const dispose = showModal(<AddressForm onSuccess={() => dispose()} />, {
      title: "Add address",
    });
  };
  return (
    <ThemedPageLayout>
      <AppBar
        title="Address Book"
        actions={
          <TouchableOpacity activeOpacity={0.5} onPress={handleAdd}>
            <ExpoIconComponent family="Entypo" name="add-to-list" />
          </TouchableOpacity>
        }
      />
      <Box flex={1} p={"m"}>
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
          success={(data) => {
            if (data?.length === 0)
              return <EmptyState message="No addresses" />;
            return (
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
                    <ExpansionTile
                      title={item.name}
                      subtitle={item.description}
                      leading={
                        <ExpoIconComponent
                          family="FontAwesome"
                          name="address-book"
                          color="brown"
                        />
                      }
                    >
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
            );
          }}
        />
      </Box>
    </ThemedPageLayout>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({});
