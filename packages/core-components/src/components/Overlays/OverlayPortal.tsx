import { useOverlays, useOverlayStore } from "@colony/core-global";
import React, { FC, PropsWithChildren, useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SnackBar } from "./wrappers";

type Props = PropsWithChildren<{}>;

const OverlayPortal: FC<Props> = ({ children }) => {
  const { overlays, dismiss } = useOverlays();
  const snackItems = useMemo(
    () => overlays.filter((o) => o.type === "snackbar"),
    [overlays]
  );
  const modals = useMemo(
    () => overlays.filter((o) => o.type === "modal"),
    [overlays]
  );

  return (
    <>
      {children}

      {modals.map((modal) => (
        <Modal
          key={modal.id}
          visible
          transparent={modal.modalOptions?.transparent}
          animationType="slide"
          onRequestClose={() => {
            if (modal.modalOptions?.dismissable) {
              dismiss(modal.id);
            }
          }}
        >
          <View style={styles.modalContentContainer}>{modal.component}</View>
          <SnackBar items={snackItems} />
        </Modal>
      ))}
      {/* {visible && (
        <View
          // visible={show}
          // transparent={false}
          // animationType="slide"
          // onRequestClose={() => {
          //   if (dismissable) {
          //     // Todo, handle dismiss
          //   }
          // }}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            // backgroundColor: Color("black").alpha(0.5).toString(),
            position: "absolute",
          }}
        >
          <StyledPageLayout backgroundColor="transparent">
            <View style={styles.modalContentContainer}>{component}</View>
          </StyledPageLayout>
          <SnackBar items={snackItems} />
        </View>
      )} */}

      <SnackBar items={snackItems} />
    </>
  );
};

export default OverlayPortal;

const styles = StyleSheet.create({
  modalContentContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },
});
