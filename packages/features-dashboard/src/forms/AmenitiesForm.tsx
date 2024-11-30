import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AmenityFormData } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AmenitySchema } from "../utils/validation";
import { handleApiErrors } from "@colony/core-api";

const AmenitiesForm = () => {
  const form = useForm<AmenityFormData>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(AmenitySchema),
  });

  const onSubmit: SubmitHandler<AmenityFormData> = async (data) => {
    try {
    } catch (error) {
      const e = handleApiErrors<AmenityFormData>(error);
      if (e.detail) {
        console.log(__filename, error);
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AmenityFormData, { message: val })
        );
    }
  };
  return (
    <View>
      <Text>AmenitiesForm</Text>
    </View>
  );
};

export default AmenitiesForm;

const styles = StyleSheet.create({});
