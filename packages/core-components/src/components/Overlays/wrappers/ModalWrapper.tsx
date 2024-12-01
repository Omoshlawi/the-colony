import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, PropsWithChildren } from "react";
import Constants from "expo-constants";
import { StyledPageLayout } from "../../StyledLayout";
import AppBar from "../../AppBar";
import { ExpoIconComponent } from "../../ExpoIcons";
type Props = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
  actions?: React.ReactNode;
}>;

const ModalWrapper: FC<Props> = ({ children, title, onClose, actions }) => {
  return (
    <StyledPageLayout withSafeArea={false}>
      <View style={[styles.safeArea]}>
        <AppBar
          title={title}
          actions={actions}
          leading={
            <TouchableOpacity activeOpacity={0.5} onPress={onClose}>
              <ExpoIconComponent
                family="Ionicons"
                name="arrow-back"
                size={28}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.content}>{children}</View>
      </View>
    </StyledPageLayout>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    display: "flex",
    flex: 1,
  },
});
