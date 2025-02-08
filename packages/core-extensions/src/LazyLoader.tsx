// LazyLoader.ts
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";

const loadComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const LazyComponent = React.lazy(importFunc);
  return (props: any) => (
    <Suspense fallback={<ActivityIndicator size={100} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export const createLazyExtension = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => {
  return loadComponent(importFunc);
};
