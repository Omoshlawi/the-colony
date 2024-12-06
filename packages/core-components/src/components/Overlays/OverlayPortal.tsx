import { useModalOverlay, useSnackBarOverlay } from "@colony/core-global";
import React, { FC, PropsWithChildren } from "react";
import { Modal, StyleSheet } from "react-native";
import { SnackBar } from "./wrappers";

type Props = PropsWithChildren<{}>;

const OverlayPortal: FC<Props> = ({ children }) => {
  const { transparent, visible, component } = useModalOverlay();
  const snackItems = useSnackBarOverlay();
  return (
    <>
      {children}
      {visible && (
        <Modal
          visible={visible}
          transparent={transparent}
          animationType="slide"
        >
          {component}
        </Modal>
      )}
      <SnackBar items={snackItems} />
    </>
  );
};

export default OverlayPortal;

const styles = StyleSheet.create({});
