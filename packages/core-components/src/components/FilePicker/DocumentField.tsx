import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { FilePickerBaseInputProps } from "./types";
interface Props extends FilePickerBaseInputProps {}

const DocumentField: FC<Props> = ({ multiple, renderTrigger }) => {
  if (typeof renderTrigger !== "function") return <></>;
  return <>{renderTrigger(() => {})}</>;
};

export default DocumentField;

const styles = StyleSheet.create({});
