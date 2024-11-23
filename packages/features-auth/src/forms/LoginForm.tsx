import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "../types";
import { LoginShema } from "../utils";
import { StyledButton, StyledInput } from "@colony/core-components";
import { Box } from "@colony/core-theme";
const LoginForm = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(LoginShema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {};
  return (
    <Box width={"100%"} gap={"l"}>
      <Controller
        control={form.control}
        name="identifier"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Username"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter username"
            error={error?.message}
            helperText="Username, email or phone number"
          />
        )}
      />
      <Controller
        control={form.control}
        name="password"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <StyledInput
            label="Password"
            suffixIcon={{ name: !showPassword ? "eye-off" : "eye", size: 20 }}
            secureTextEntry={!showPassword}
            onSuffixIconPressed={() => setShowPassword(!showPassword)}
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter passoword"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  fomeContainer: {
    width: "100%",
    gap: 10,
  },
});
