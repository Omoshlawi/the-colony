import React from "react";

export interface ExtensionContextProps<S = any> {
  /**
   * Context object passed to extensions
   */
  context: {
    /**
     * Global configuration for the extension system
     */
    config: Record<string, any>;

    /**
     * Metadata about the current extension
     */
    extensionMeta: ExtensionMeta;

    /**
     * State passed to the extension
     */
    state?: S;
  };
}

export interface ExtensionMeta {
  name: string;
  slots: string[];
  order?: number;
  meta?: Record<string, any>;
}

export interface ExtensionDefinition<P = any, S = any> extends ExtensionMeta {
  /**
   * Lazy-loaded component for the extension
   */
  load: () => Promise<{
    default: React.ComponentType<ExtensionContextProps<S>>;
  }>;
}
