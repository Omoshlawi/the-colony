import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { FilePickerBaseInputProps } from "./types";
interface Props extends FilePickerBaseInputProps {}

const VideoField: FC<Props> = ({ multiple, renderTrigger }) => {
  if (typeof renderTrigger !== "function") return <></>;
  return <>{renderTrigger(() => {})}</>;
};

export default VideoField;

const styles = StyleSheet.create({});
