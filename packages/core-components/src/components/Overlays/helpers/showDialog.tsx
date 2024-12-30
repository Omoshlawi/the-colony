import { useOverlayStore } from "@colony/core-global";
import uniqueId from "lodash/uniqueId";
import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { DialogWrapper } from "../wrappers";

export const showDialog = (
  component?: ReactNode,
  { dismissable = true, transparent }: ModalOptions = {}
) => {
  const state = useOverlayStore.getState();
  const id = uniqueId(`${Date.now()}`);
  const dismiss = () => state.dismiss(id);
  state.updateOverlays([
    ...state.overlays,
    {
      component: (
        <DialogWrapper dismissible={dismissable} onDismiss={dismiss}>
          {component}
        </DialogWrapper>
      ),
      modalOptions: {
        transparent: transparent ?? true,
        dismissable: dismissable ?? true,
      },
      id,
      type: "modal",
    },
  ]);

  return dismiss;
};
