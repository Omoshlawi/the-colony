import { extensionRegistry } from "@colony/core-extensions";

export const registerExtensions = () => {
  extensionRegistry.registerExtension({
    name: "logout-extension",
    load: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simpulate loading
      const module = require("../widgets");
      //   const module = await import("../widgets/LogoutSection"); //Works bt requires further ts configuation
      return {
        default: module.LogoutSection,
      };
      //   return new Promise((resolve) => {
      //     const req = require("../widgets/LogoutSection");
      //     resolve({
      //       default: req.default || req, // Handles both default and direct exports
      //     });
      //   });
    },
    slots: ["logout-slot"],
  });
};

/*

import { extensionRegistry } from "@colony/core-extensions";

export const registerExtensions = () => {
  // Use require.context to dynamically load extensions
  const extensionContext = require.context(
    "../widgets", // Directory to search
    true, // Search subdirectories
    /\.tsx?$/ // Match TypeScript files
  );

  extensionContext.keys().forEach((filePath) => {
    const extension = extensionContext(filePath);

    // Extract extension metadata from filename or export
    // const extensionName = filePath.replace(/^.*\/([^/]+)\.tsx?$/, "$1");

    extensionRegistry.registerExtension({
      //   id: `${extensionName.toLowerCase()}-extension`,
      name: "logout",
      slots: ["logout-slot"], //extension.slots || ["default-slot"], // Allow defining slots in the extension
      load: () =>
        Promise.resolve({
          default: extension.default || extension,
        }),
      meta: extension.meta, // Optional additional metadata
    });
  });
};
*/
