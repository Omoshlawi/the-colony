import React from "react";
import useModalOverlayStore from "./useModalOverlayStore";

const useSnackBarOverlay = () => {
  const snackbarOverlay = useModalOverlayStore(
    (state) => state.snackbarOverlay
  );

  return snackbarOverlay;
};

export default useSnackBarOverlay;
