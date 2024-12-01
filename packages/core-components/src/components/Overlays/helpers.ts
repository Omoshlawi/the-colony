import { useModalOverlayStore } from "@colony/core-global";
import { ReactNode } from "react";

type ModalOptions = {
  transparent?: boolean;
  dismissable?: boolean;
};

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

export const showDialog = (
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

export const showModalBottomSheet = (
  component?: ReactNode, 
  options: ModalOptions = {}
) => {
  const state = useModalOverlayStore.getState();
  
  state.updateModalOverlay({ 
    visible: true, 
    component,
    transparent: options.transparent ?? false,
    dismissable: options.dismissable ?? true
  });

  return () => state.updateModalOverlay({ 
    visible: false, 
    component: null 
  });
};

// Comprehensive helper for more complex scenarios
export const modalController = {
  show: (
    component: ReactNode, 
    type: 'modal' | 'dialog' | 'bottomSheet' = 'modal',
    options: ModalOptions = {}
  ) => {
    const state = useModalOverlayStore.getState();
    
    const typeConfig = {
      modal: { transparent: true },
      dialog: { transparent: true },
      bottomSheet: { transparent: false }
    }[type];

    state.updateModalOverlay({ 
      visible: true, 
      component,
      ...typeConfig,
      ...options
    });

    return () => state.updateModalOverlay({ 
      visible: false, 
      component: null 
    });
  },

  close: () => {
    const state = useModalOverlayStore.getState();
    state.updateModalOverlay({ 
      visible: false, 
      component: null 
    });
  }
};

// Usage examples:
// showModal(<MyComponent />, { transparent: true })
// showDialog(<AlertDialog />, { dismissable: false })
// modalController.show(<BottomSheet />, 'bottomSheet')