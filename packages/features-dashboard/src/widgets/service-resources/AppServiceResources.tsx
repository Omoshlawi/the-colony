import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { AppService } from "@/src/types";
import {
  useAppServicesResourceSchema,
  useAppServicesResourceSchemaApi,
} from "../../hooks";
import {
  ConfirmDialog,
  ErrorState,
  ListTile,
  ListTileSkeleton,
  showDialog,
  showSnackbar,
  When,
} from "@colony/core-components";
import { handleApiErrors } from "@colony/core-api";
import { Box } from "@colony/core-theme";

type Props = {
  service: AppService;
};

const AppServiceResources: FC<Props> = ({ service: { name } }) => {
  const state = useAppServicesResourceSchema(name);
  const { sourceServiceResourcesSchema } = useAppServicesResourceSchemaApi();
  const handleConfirmSource = () => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Confirm"
        message="Are you sure you want to source resource schema?"
        onCancel={() => dispose()}
        onConfirm={() => {
          dispose();
          sourceServiceResourcesSchema(name)
            .then(() => {
              showSnackbar({
                kind: "success",
                title: "Success",
                subtitle: "Resource schema sourced successfully",
              });
            })
            .catch((error) => {
              showSnackbar({
                kind: "error",
                title: "Error",
                subtitle: handleApiErrors(error)?.detail,
              });
            });
        }}
      />
    );
  };
  return (
    <When
      asyncState={{ ...state, data: state.resourceSchemas }}
      error={(error) => <ErrorState error={error} />}
      loading={() => (
        <Box gap={"m"}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <ListTileSkeleton key={idx} />
          ))}
        </Box>
      )}
      success={(data) => (
        <TouchableOpacity activeOpacity={0.5} onPress={handleConfirmSource}>
          {Object.keys(data.schemas).map((resource, idx) => {
            const resourceData = data.schemas[resource];
            return (
              <ListTile
                disabled
                key={`${resource}-${idx}`}
                title={resource}
                subtitle={resourceData.columnNames.join(", ")}
                borderBottom
              />
            );
          })}
        </TouchableOpacity>
      )}
    />
  );
};

export default AppServiceResources;

const styles = StyleSheet.create({});
