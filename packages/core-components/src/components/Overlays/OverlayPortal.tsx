import { Modal, StyleSheet, Switch, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { useModalOverlay, useModalOverlayStore } from "@colony/core-global";

type Props = PropsWithChildren<{}>;

const OverlayPortal: FC<Props> = ({ children }) => {
  const { transparent, visible, component } = useModalOverlay();
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
    </>
  );
};

export default OverlayPortal;

const styles = StyleSheet.create({});
