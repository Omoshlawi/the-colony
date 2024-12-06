import {
  ExpoIconComponent,
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useAuthAPi } from "../hooks";
import { RegisterFormData } from "../types";
import { RegisterSchema } from "../utils";

const RegisterForm = () => {
  const { registerUser, handleError } = useAuthAPi();

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

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerUser(data);
      showSnackbar({
        title: "succes",
        subtitle: "login succesfull",
        kind: "success",
      });
    } catch (error) {
      const e = handleError<RegisterFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RegisterFormData, { message: val })
        );
    }
  };
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
            autoCapitalize="none"
            autoCorrect={false}
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
            autoCapitalize="none"
            autoCorrect={false}
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
            suffixIcon={
              <ExpoIconComponent
                family="Ionicons"
                name={!showPassword ? "eye-off" : "eye"}
                size={20}
              />
            }
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
            suffixIcon={
              <ExpoIconComponent
                family="Ionicons"
                name={!showPassword ? "eye-off" : "eye"}
                size={20}
              />
            }
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
