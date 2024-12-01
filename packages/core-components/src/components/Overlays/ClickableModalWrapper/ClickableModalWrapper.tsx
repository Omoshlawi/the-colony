import Constants from "expo-constants";
import React, { FC, PropsWithChildren, ReactNode, useState } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppBar from "../../AppBar";
import { ExpoIconComponent } from "../../ExpoIcons";
import { StyledPageLayout } from "../../StyledLayout";

interface ClickableModalWrapperProps extends PropsWithChildren {
  renderContent: (dismiss?: () => void) => ReactNode;
  onRequestClose?: () => boolean;
  title: string;
  renderActions?: (dismiss?: () => void) => ReactNode;
}

const ClickableModalWrapper: FC<ClickableModalWrapperProps> = ({
  children,
  onRequestClose,
  title,
  renderActions,
  renderContent,
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
        accessibilityLabel="Close modal"
        accessibilityRole="button"
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
            {renderContent(handleDismiss)}
          </View>
        </StyledPageLayout>
      </Modal>
    </>
  );
};

export default React.memo(ClickableModalWrapper);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
