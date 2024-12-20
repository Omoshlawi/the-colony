import {
  ErrorState,
  ExpansionTile,
  ExpoIconComponent,
  ListTileSkeleton,
  When,
} from "@colony/core-components";
import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useAppServices } from "../../hooks";
import AppServiceResources from "./AppServiceResources";

type Props = {};

const AppServices: FC<Props> = ({}) => {
  const { mutate, ...state } = useAppServices();

  return (
    <When
      asyncState={{ ...state, data: state.appServices }}
      error={(error) => <ErrorState error={error} />}
      loading={() => (
        <>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ListTileSkeleton key={idx} />
          ))}
        </>
      )}
      success={(data) => (
        <FlatList
          data={data}
          keyExtractor={({ name }) => name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExpansionTile
              leading={<ExpoIconComponent family="Ionicons" name="cube" />}
              title={item.name}
              subtitle={`${item.version} | ${item.host}:${item.port}`}
            >
              <AppServiceResources service={item} />
            </ExpansionTile>
          )}
        />
      )}
    />
  );
};

export default AppServices;

const styles = StyleSheet.create({});
