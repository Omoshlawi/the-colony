import useModalOverlayStore from "./useModalOverlayStore";

const useModalOverlay = () => {
  const modalOverlay = useModalOverlayStore((state) => state.modalOverlay);
  return modalOverlay;
};

export default useModalOverlay;
