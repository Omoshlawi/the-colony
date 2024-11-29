import React, { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SWRConfig } from "swr";
import { hiveFetch } from "./hiveFetch";

interface ApiConfigProviderProps extends PropsWithChildren {}

const ApiConfigProvider: FC<ApiConfigProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => await hiveFetch(resource, init),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default ApiConfigProvider;

const styles = StyleSheet.create({});
