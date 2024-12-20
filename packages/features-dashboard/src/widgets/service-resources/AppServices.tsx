import { useAppServices } from "../../hooks";
import {
  ErrorState,
  ExpansionTile,
  ExpoIconComponent,
  LoadingState,
  When,
} from "@colony/core-components";
import { Box, Text } from "@colony/core-theme";
import React, { FC } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onDismiss: () => void;
};

const AppServices: FC<Props> = ({ onDismiss }) => {
  const { mutate, ...state } = useAppServices();

  return (
    <Box p={"m"} gap={"m"}>
      <Text fontWeight={"700"} color={"text"} variant={"titleMedium"}>
        AppServices
      </Text>
      <Box>
        <When
          asyncState={{ ...state, data: state.appServices }}
          error={(error) => <ErrorState error={error} />}
          loading={() => <LoadingState />}
          success={(data) => (
            <FlatList
              data={data}
              keyExtractor={({ name }) => name}
              renderItem={({ item }) => (
                <ExpansionTile
                  leading={
                    <ExpoIconComponent family="FontAwesome6" name="info" />
                  }
                  title={item.name}
                  subtitle={`${item.version} | ${item.host}:${item.port}`}
                >
                  <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius cumque animi iure, distinctio tempora at quod? Quae
                    eius quas iusto. Enim inventore quo fuga deleniti nobis
                    exercitationem labore est dignissimos!
                  </Text>
                </ExpansionTile>
              )}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default AppServices;

const styles = StyleSheet.create({});
