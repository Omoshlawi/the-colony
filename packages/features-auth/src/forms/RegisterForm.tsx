import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../utils";
import { Box } from "@colony/core-theme";
import { StyledButton, StyledInput } from "@colony/core-components";

const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {};
  return (
    <Box width={"100%"} gap={"m"}>
      <Controller
        control={form.control}
        name="username"
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
          />
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Email"
            readOnly={disabled}
            keyboardType="email-address"
            onChangeText={onChange}
            placeholder="Enter email"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({
          field: { onChange, value, disabled },
          fieldState: { error },
        }) => (
          <StyledInput
            value={value}
            label="Phone number"
            readOnly={disabled}
            keyboardType="phone-pad"
            onChangeText={onChange}
            placeholder="Enter valid phone number"
            error={error?.message}
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
            placeholder="*********"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="confirmPassword"
        render={({
          field: { onChange, value, disabled, onBlur, ref },
          fieldState: { error },
        }) => (
          <StyledInput
            label="Confirm password"
            suffixIcon={{ name: !showPassword ? "eye-off" : "eye", size: 20 }}
            secureTextEntry={!showPassword}
            onSuffixIconPressed={() => setShowPassword(!showPassword)}
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="**********"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
