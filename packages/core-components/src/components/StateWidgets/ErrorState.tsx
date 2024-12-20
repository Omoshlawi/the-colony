import { HiveFetchError } from "@colony/core-api";
import { Box, Text } from "@colony/core-theme";
import * as React from "react";
import ErrorStateSvg from "./ErrorStateSvg";

type ErrorStateProps<T> = {
  message?: string;
  detail?: string;
  error?: HiveFetchError<T>;
};
const ErrorState = <T extends { detail?: string; [k: string]: any }>({
  message,
  detail,
  error,
}: ErrorStateProps<T>) => {
  return (
    <Box
      flex={1}
      flexDirection={"column"}
      gap={"m"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ErrorStateSvg width={"80%"} style={{ aspectRatio: 1 }} />

      {(message || error) && (
        <Text variant={"bodyMedium"} color={"outline"}>
          {error?.message ?? message}
        </Text>
      )}
      {(detail || error) && (
        <Text variant={"bodySmall"} color={"outline"}>
          {error?.response?.data?.detail ?? detail}
        </Text>
      )}
    </Box>
  );
};

export default ErrorState;
