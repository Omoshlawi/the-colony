import React, { Suspense, lazy, useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
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

  if (!extensions.length) return <></>;

  return (
    <View>
      {extensions.map((extension) => {
        const LazyComponent = lazy(extension.load);

        return (
          <Suspense
            key={extension.name}
            fallback={fallback || <ActivityIndicator size={100} />}
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
