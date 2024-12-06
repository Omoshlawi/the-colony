import { useModalOverlayStore, useSnackBarOverlay } from "@colony/core-global";
import { Box, Text } from "@colony/core-theme";
import uniqueId from "lodash/uniqueId";
import React, { FC, useEffect } from "react";
import { ExpoIconComponent } from "../../ExpoIcons";
import { TouchableOpacity } from "react-native";

export const showSnackbar = ({
  options,
  subtitle,
  title,
}: {
  title?: string;
  subtitle?: string;
  options?: { timeout?: number; dismissible?: boolean };
} = {}) => {
  const timeout = options?.timeout;
  const state = useModalOverlayStore.getState();

  const id = uniqueId(`${Date.now()}`);

  state.updateSnackbarOverlay([
    ...state.snackbarOverlay,
    {
      component: (
        <Snackbaritem
          timeout={timeout}
          title={title}
          dismissible={options?.dismissible}
          subtitle={subtitle}
          onRemove={() => {
            useModalOverlayStore.setState((state) => ({
              ...state,
              snackbarOverlay: state.snackbarOverlay.filter(
                (over) => over.id !== id
              ),
            }));
          }}
        />
      ),
      id: id,
    },
  ]);
};

type Props = {
  title?: string;
  subtitle?: string;
  timeout?: number;
  onRemove?: () => void;
  dismissible?: boolean;
};
const Snackbaritem: FC<Props> = ({
  subtitle,
  title,
  timeout = 3000,
  onRemove,
  dismissible = false,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onRemove]);

  return (
    <Box p={"s"} backgroundColor={"text"} borderRadius={"small"}>
      <Box flex={1} flexDirection={"row"} justifyContent={"space-between"}>
        {title && (
          <Text color={"background"} variant={"bodySmall"}>
            {title}
          </Text>
        )}
        {dismissible && (
          <TouchableOpacity onPress={onRemove}>
            <ExpoIconComponent
              family="AntDesign"
              name="closesquareo"
              size={16}
            />
          </TouchableOpacity>
        )}
      </Box>
      {subtitle && (
        <Text color={"outline"} variant={"bodySmall"}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};
