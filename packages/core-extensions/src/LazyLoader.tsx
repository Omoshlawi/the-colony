// LazyLoader.ts
import React, { Suspense } from "react";

const loadComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const LazyComponent = React.lazy(importFunc);
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export const createLazyExtension = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => {
  return loadComponent(importFunc);
};
