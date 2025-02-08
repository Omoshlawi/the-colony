import { handleApiErrors } from "@colony/core-api";
import {
  ConfirmDialog,
  ErrorState,
  ListTile,
  ListTileSkeleton,
  showDialog,
  showSnackbar,
  When,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  useAppServicesResourceSchema,
  useAppServicesResourceSchemaApi,
} from "../../hooks";
import { AppService } from "../../types";

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
