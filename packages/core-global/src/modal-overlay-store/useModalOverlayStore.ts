import { create } from "zustand";
import { ModalOverlay } from "../types";

type ModalOverlayStore = {
  modalOverlay: ModalOverlay;
  update: (store: Partial<ModalOverlayStore>) => void;
  setModalOverlay: (modalOverlay: ModalOverlay) => void;
  updateModalOverlay: (modalOverlay: Partial<ModalOverlay>) => void;
};

const useModalOverlayStore = create<ModalOverlayStore>((set) => ({
  modalOverlay: { visible: false, transparent: true, dismissable: true },
  update: (store: Partial<ModalOverlayStore>) =>
    set((state) => ({
      ...state,
      ...Object.entries(store)?.reduce((prev, [key, val]) => {
        if (val !== undefined && val !== null) {
          return { ...prev, [key]: val };
        }
        return prev;
      }, {}),
    })),
  setModalOverlay: (modalOverlay: ModalOverlay) =>
    set((state) => ({ ...state, modalOverlay })),
  updateModalOverlay: (modalOverlay: Partial<ModalOverlay>) =>
    set((state) => ({
      ...state,
      modalOverlay: {
        ...state.modalOverlay,
        ...Object.entries(modalOverlay)?.reduce((prev, [key, val]) => {
          if (val !== undefined && val !== null) {
            return { ...prev, [key]: val };
          }
          return prev;
        }, {}),
      },
    })),
}));

export default useModalOverlayStore;
