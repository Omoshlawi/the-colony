import { ExtensionDefinition } from "./types";

class ExtensionRegistry {
  private extensions: Map<string, ExtensionDefinition[]> = new Map();
  private config: Record<string, any> = {};

  registerExtension(extension: ExtensionDefinition) {
    extension.slots.forEach((slot) => {
      const existingExtensions = this.extensions.get(slot) || [];

      const updatedExtensions = [...existingExtensions, extension].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      this.extensions.set(slot, updatedExtensions);
    });
  }

  /**
   *
   * @param slotName
   * @param filterFn
   * @example // Usage in ExtensionSlot
   *        const filteredExtensions = extensionRegistry.getExtensionsForSlot(name, (ext) => {
   *       return ext.meta?.enabled !== false; // Example filter based on metadata
   *       });}
   * @returns
   */
  getExtensionsForSlot(
    slotName: string,
    filterFn?: (ext: ExtensionDefinition) => boolean
  ): ExtensionDefinition[] {
    const extensions = this.extensions.get(slotName) || [];
    return filterFn ? extensions.filter(filterFn) : extensions;
  }

  setConfig(config: Record<string, any>) {
    this.config = { ...this.config, ...config };
  }

  getConfig() {
    return this.config;
  }
}

export const extensionRegistry = new ExtensionRegistry();
