import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { useModalOverlayStore } from "@colony/core-global";
import { DialogWrapper } from "../wrappers";

export const showDialog = (
  component?: ReactNode,
  options: ModalOptions = {}
) => {
  const state = useModalOverlayStore.getState();

  state.updateModalOverlay({
    visible: true,
    component: component && <DialogWrapper>{component}</DialogWrapper>,
    transparent: options.transparent ?? true,
    dismissable: options.dismissable ?? true,
  });

  return () =>
    state.updateModalOverlay({
      visible: false,
      component: null,
    });
};
