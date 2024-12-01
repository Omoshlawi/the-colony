import { ReactNode } from "react";
import { ModalOptions } from "../types";
import { useModalOverlayStore } from "@colony/core-global";

export const showModal = (
    component?: ReactNode, 
    options: ModalOptions = {}
  ) => {
    const state = useModalOverlayStore.getState();
    
    state.updateModalOverlay({ 
      visible: true, 
      component,
      transparent: options.transparent ?? true,
      dismissable: options.dismissable ?? true
    });
  
    return () => state.updateModalOverlay({ 
      visible: false, 
      component: null 
    });
  };