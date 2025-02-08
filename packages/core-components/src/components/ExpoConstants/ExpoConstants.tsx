import constanst, { Constants } from "expo-constants";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

type Props = {
  renderComponent: (constants: Constants) => React.ReactNode;
};

const ExpoConstants: FC<Props> = ({ renderComponent }) => {
  return <>{renderComponent(constanst)}</>;
};

export default ExpoConstants;

const styles = StyleSheet.create({});
