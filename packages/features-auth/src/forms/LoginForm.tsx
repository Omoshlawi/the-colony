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
      <Text>{JSON.stringify(form.formState.errors, null, 2)}</Text>
      <Controller
        control={form.control}
        name="identifier"
        render={({ field: { onChange, value, disabled } }) => (
          <StyledInput
            value={value}
            label="Username"
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Username"
          />
        )}
      />
      <Controller
        control={form.control}
        name="password"
        render={({ field: { onChange, value, disabled, onBlur, ref } }) => (
          <StyledInput
            label="Password"
            value={value}
            readOnly={disabled}
            onChangeText={onChange}
            placeholder="Passoword"
            onBlur={onBlur}
          />
        )}
      />
      <Button title="Submit" onPress={form.handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
