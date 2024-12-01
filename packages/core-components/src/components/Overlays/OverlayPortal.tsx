import { Modal, StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { useModalOverlay } from "@colony/core-global";

type Props = PropsWithChildren<{}>;

const OverlayPortal: FC<Props> = ({ children }) => {
  const { transparent, visible, component } = useModalOverlay();
  return (
    <>
      {children}
      <Modal visible={visible}>{component}</Modal>
    </>
  );
};

export default OverlayPortal;

const styles = StyleSheet.create({});
