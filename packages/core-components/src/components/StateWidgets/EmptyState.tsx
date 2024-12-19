import { Box, Text } from "@colony/core-theme";
import * as React from "react";
import EmptyStateSvg from "./EmptyStateSvg";

type EmptyStateProps = {
  message?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No data available",
}) => {
  return (
    <Box
      flex={1}
      flexDirection={"column"}
      gap={"m"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <EmptyStateSvg width={"80%"} style={{ aspectRatio: 1 }} />
      <Text color={"outline"} variant={"bodyMedium"}>
        {message}
      </Text>
    </Box>
  );
};

export default EmptyState;
