import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, Form, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "../types";
import { LoginShema } from "../utils";
import { StyledInput } from "@colony/core-components";
const LoginForm = () => {
  const form = useForm<LoginFormData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(LoginShema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {};
  return (
    <View>
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
            helperText="fudncdnc"
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
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Enter passoword"
            onBlur={onBlur}
            error={error?.message}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
