import { StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { Box, useTheme } from "@colony/core-theme";

type Props = PropsWithChildren<{}>;

const DialogWrapper: FC<Props> = ({ children }) => {
  return (
    <Box
      style={[styles.container]}
      flex={1}
      flexDirection={"column"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Box
        margin={"xl"}
        borderRadius={"large"}
        backgroundColor={"background"}
        overflow={"hidden"}
        maxHeight={"80%"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DialogWrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
