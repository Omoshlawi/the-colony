import Constants from "expo-constants";
import React, { FC, PropsWithChildren, ReactNode, useState } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppBar from "../AppBar";
import { ExpoIconComponent } from "../ExpoIcons";
import { StyledPageLayout } from "../StyledLayout";

interface ClickableModalWrapperProps extends PropsWithChildren {
  content: ReactNode;
  onRequestClose?: () => boolean;
  title: string;
  renderActions?: (dismiss?: () => void) => ReactNode;
}

const ClickableModalWrapper: FC<ClickableModalWrapperProps> = ({
  children,
  content,
  onRequestClose,
  title,
  renderActions,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleDismiss = () => setShowModal(false);
  return (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setShowModal(true)}>
        {children}
      </TouchableOpacity>
      <Modal
        visible={showModal}
        onRequestClose={() => {
          if (onRequestClose?.() === true) {
            handleDismiss();
          }
        }}
        animationType="slide"
      >
        <StyledPageLayout withSafeArea={false}>
          <View
            style={[styles.safeArea, { marginTop: StatusBar.currentHeight }]}
          >
            <AppBar
              title={title}
              actions={renderActions?.(handleDismiss)}
              leading={
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setShowModal(false)}
                >
                  <ExpoIconComponent
                    family="Ionicons"
                    name="arrow-back"
                    size={28}
                  />
                </TouchableOpacity>
              }
            />
            {content}
          </View>
        </StyledPageLayout>
      </Modal>
    </>
  );
};

export default ClickableModalWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
