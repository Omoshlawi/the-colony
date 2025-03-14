import Constants from "expo-constants";
import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppBar from "../../AppBar";
import { ExpoIconComponent } from "../../ExpoIcons";
import { ThemedPageLayout } from "../../StyledLayout";
type Props = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
  actions?: React.ReactNode;
}>;

const ModalWrapper: FC<Props> = ({ children, title, onClose, actions }) => {
  return (
    <ThemedPageLayout withSafeArea={false}>
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
    </ThemedPageLayout>
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
