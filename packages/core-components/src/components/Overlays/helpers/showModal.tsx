import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { useModalOverlayStore } from "@colony/core-global";
import { ModalWrapper } from "../wrappers";

export const showModal = (
  component?: ReactNode,
  options: ModalOptions & { title?: string } = {}
) => {
  const state = useModalOverlayStore.getState();
  const dismiss = () =>
    state.updateModalOverlay({
      visible: false,
      component: null,
    });
  state.updateModalOverlay({
    visible: true,
    component: component && (
      <ModalWrapper title={options?.title} onClose={dismiss}>
        {component}
      </ModalWrapper>
    ),
    transparent: options.transparent ?? false,
    dismissable: options.dismissable ?? true,
  });

  return dismiss;
};
