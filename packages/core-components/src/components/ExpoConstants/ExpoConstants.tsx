import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import constanst, { Constants } from "expo-constants";

type Props = {
  renderComponent: (constants: Constants) => React.ReactNode;
};

const ExpoConstants: FC<Props> = ({ renderComponent }) => {
  return <>{renderComponent(constanst)}</>;
};

export default ExpoConstants;

const styles = StyleSheet.create({});
