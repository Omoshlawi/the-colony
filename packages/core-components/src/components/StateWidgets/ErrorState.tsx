import { Box, Text } from "@colony/core-theme";
import * as React from "react";
import ErrorStateSvg from "./ErrorStateSvg";

type ErrorStateProps = {
  message?: string;
  detail?: string;
};
const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong",
  detail,
}) => {
  return (
    <Box
      flex={1}
      flexDirection={"column"}
      gap={"m"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ErrorStateSvg width={"80%"} style={{ aspectRatio: 1 }} />
      <Text variant={"bodyMedium"} color={"outline"}>
        {message}
      </Text>
      {detail && (
        <Text variant={"bodySmall"} color={"outline"}>
          {detail}
        </Text>
      )}
    </Box>
  );
};

export default ErrorState;
