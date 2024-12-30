import { useOverlayStore } from "@colony/core-global";
import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { BottomSheetModalWrapper } from "../wrappers";
import { DimensionValue } from "react-native";
import uniqueId from "lodash/uniqueId";

export const showModalBottomSheet = (
  component?: ReactNode,
  options: ModalOptions & { title?: string; height?: DimensionValue } = {}
) => {
  const state = useOverlayStore.getState();
  const id = uniqueId(`${Date.now()}`);

  const dismiss = () => state.dismiss(id);
  state.updateOverlays([
    ...state.overlays,
    {
      id,
      type: "modal",
      modalOptions: {
        transparent: options.transparent ?? true,
        dismissable: options.dismissable ?? true,
      },
      component: (
        <BottomSheetModalWrapper
          onClose={dismiss}
          height={options?.height}
          title={options?.title}
        >
          {component}
        </BottomSheetModalWrapper>
      ),
    },
  ]);

  return dismiss;
};
