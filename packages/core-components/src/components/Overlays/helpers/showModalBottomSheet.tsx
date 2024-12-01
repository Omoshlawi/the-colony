import { useModalOverlayStore } from "@colony/core-global";
import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { BottomSheetModalWrapper } from "../wrappers";
import { DimensionValue } from "react-native";

export const showModalBottomSheet = (
  component?: ReactNode,
  options: ModalOptions & { title?: string; height?: DimensionValue } = {}
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
      <BottomSheetModalWrapper
        onClose={dismiss}
        height={options?.height}
        title={options?.title}
      >
        {component}
      </BottomSheetModalWrapper>
    ),
    transparent: options.transparent ?? true,
    dismissable: options.dismissable ?? true,
  });

  return dismiss;
};
