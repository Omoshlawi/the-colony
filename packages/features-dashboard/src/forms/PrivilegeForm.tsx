import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Privilege } from "../types";

type Props = {
  privilege?: Privilege;
  onSuccess?: () => void;
};
const PrivilegeForm: FC<Props> = () => {
  return (
    <View>
      <Text>PrivilegeForm</Text>
    </View>
  );
};

export default PrivilegeForm;

const styles = StyleSheet.create({});
