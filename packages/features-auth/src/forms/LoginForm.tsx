import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "../types";
import { LoginShema } from "../utils";
import {
  ExpoIconComponent,
  showSnackbar,
  StyledButton,
  StyledInput,
} from "@colony/core-components";
import { Box } from "@colony/core-theme";
import { useAuthAPi } from "../hooks";
import { handleApiErrors } from "@colony/core-api";
const LoginForm = () => {
  const { loginUser } = useAuthAPi();
  const form = useForm<LoginFormData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(LoginShema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await loginUser(data);
      showSnackbar({
        title: "succes",
        subtitle: "login succesfull",
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<LoginFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof LoginFormData, { message: val })
        );
    }
  };
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
            autoCapitalize="none"
            autoCorrect={false}
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
            placeholder="Enter passoword"
            onBlur={onBlur}
            error={error?.message}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      <StyledButton title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </Box>
  );
};

export default LoginForm;
