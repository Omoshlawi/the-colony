import { useModalOverlayStore, useSnackBarOverlay } from "@colony/core-global";
import { Box, Text, useTheme } from "@colony/core-theme";
import uniqueId from "lodash/uniqueId";
import React, { FC, useEffect } from "react";
import { ExpoIconComponent } from "../../ExpoIcons";
import { TouchableOpacity } from "react-native";

export const showSnackbar = ({
  options,
  subtitle,
  title,
  kind = "info",
}: {
  title?: string;
  subtitle?: string;
  kind?: "success" | "error" | "warning" | "info";
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
          kind={kind}
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
  kind?: "success" | "error" | "warning" | "info";
  leading?: React.ReactNode;
};
const Snackbaritem: FC<Props> = ({
  subtitle,
  title,
  timeout = 3000,
  onRemove,
  dismissible = false,
  kind,
  leading,
}) => {
  const theme = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onRemove]);

  return (
    <Box
      style={{ backgroundColor: "white" }}
      borderRadius={"small"}
      overflow={"hidden"}
    >
      <Box
        overflow={"hidden"}
        p={"s"}
        gap={"m"}
        flexDirection={"row"}
        backgroundColor={
          kind === "info"
            ? "text"
            : kind === "error"
            ? "errorContainer"
            : kind === "warning"
            ? "warningContainer"
            : "successContainer"
        }
      >
        {leading ?? (
          <ExpoIconComponent
            size={18}
            family="AntDesign"
            name={
              kind === "info" || kind === "success" ? "infocirlceo" : "warning"
            }
          />
        )}
        <Box flex={1} flexDirection={"column"}>
          {title && (
            <Text
              style={{
                color: kind === "info" ? theme.colors.background : "black",
                flex: 1,
              }}
              variant={"bodySmall"}
              fontWeight={"700"}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={{
                color: kind === "info" ? theme.colors.background : "black",
              }}
              variant={"bodySmall"}
            >
              {subtitle}
            </Text>
          )}
        </Box>
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
    </Box>
  );
};
