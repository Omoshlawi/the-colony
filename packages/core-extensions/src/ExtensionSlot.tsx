import React, { Component, ReactNode, Suspense, lazy, useMemo } from "react";
import { View, Text } from "react-native";
import { extensionRegistry } from "./ExtensionRegistry";

export function ExtensionSlot<S = any>({
  name,
  state,
  fallback,
}: {
  name: string;
  state?: S;
  fallback?: React.ReactNode;
}) {
  const extensions = useMemo(
    () => extensionRegistry.getExtensionsForSlot(name),
    [name]
  );

  return (
    <View>
      {extensions.map((extension) => {
        const LazyComponent = lazy(extension.load);

        return (
          <Suspense
            key={extension.name}
            fallback={fallback || <Text>Loading...</Text>}
          >
            <LazyComponent
              context={{
                config: extensionRegistry.getConfig(),
                extensionMeta: extension,
                state: state,
              }}
            />
          </Suspense>
        );
      })}
    </View>
  );
}
