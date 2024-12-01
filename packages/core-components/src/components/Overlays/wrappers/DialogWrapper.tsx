import { StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const DialogWrapper: FC<Props> = ({ children }) => {
  return (
    <View>
      <Text>DialogWrapper</Text>
    </View>
  );
};

export default DialogWrapper;

const styles = StyleSheet.create({});
