import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Role } from "../types";

type Props = {
  role?: Role;
  onSuccess?: () => void;
};

const RolesForm: FC<Props> = ({ onSuccess, role }) => {
  return (
    <View>
      <Text>RolesForm</Text>
    </View>
  );
};

export default RolesForm;

const styles = StyleSheet.create({});
