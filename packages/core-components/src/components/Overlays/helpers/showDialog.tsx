import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { useOverlayStore } from "@colony/core-global";
import { DialogWrapper } from "../wrappers";
import uniqueId from "lodash/uniqueId";

export const showDialog = (
  component?: ReactNode,
  options: ModalOptions = {}
) => {
  const state = useOverlayStore.getState();
  const id = uniqueId(`${Date.now()}`);

  state.updateOverlays([
    ...state.overlays,
    {
      component: <DialogWrapper>{component}</DialogWrapper>,
      modalOptions: {
        transparent: options.transparent ?? true,
        dismissable: options.dismissable ?? true,
      },
      id,
      type: "modal",
    },
  ]);

  return () => state.dismiss(id);
};
