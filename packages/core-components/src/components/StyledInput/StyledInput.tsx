import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { FC } from "react";
import { inputStyles } from "./inputStyles";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

const StyledInput: FC<Props> = ({ label, error, style, ...props }) => {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput {...props} style={[inputStyles, style]} />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default StyledInput;
