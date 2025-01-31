import {
  StyleSheet,
  View,
  Platform,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import { default as React, useState } from "react";
import {
  default as CommunityDateTimePicker,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TextInput, TextInputProps } from "../Input";
import { Box } from "@colony/core-theme";
import { ExpoIconComponent } from "../ExpoIcons";

type DateTimePickerProps = Pick<
  TextInputProps,
  "prefixIcon" | "label" | "onPrefixIconPressed" | "placeholder"
> & {
  date: Date;
  onDateChanged: (date: Date) => void;
  formater?: (date: Date) => string;
  mode?: "date" | "time" | "datetime" | "countdown";
  display?: "spinner" | "compact" | "default";
  error?: string;
  helpText?: string;
};
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  onDateChanged,
  formater,
  mode = "date",
  display = "default",
  ...props
}) => {
  const [isPickerShow, setIsPickerShow] = useState<boolean>(false);
  const [androidDateTime, setAndroidDateTime] = useState<{
    date: Date;
    time: Date;
    currentMode: "date" | "time";
  }>({
    date: date,
    time: date,
    currentMode: "date",
  });

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) onDateChanged(date);
    setIsPickerShow(false);
    setAndroidDateTime({ date: date!, time: date!, currentMode: "date" });
  };

  const toggleShowPicker = () => {
    setIsPickerShow(!isPickerShow);
  };

  return (
    <Box width={"100%"} gap={"s"}>
      <TextInput
        {...props}
        value={formater ? formater(date) : date.toLocaleString()}
        onPress={toggleShowPicker}
        editable={false}
        readOnly={true}
        suffixIcon={
          <ExpoIconComponent family="MaterialCommunityIcons" name="calendar" />
        }
        onSuffixIconPressed={toggleShowPicker}
      />

      {Platform.OS === "android" && isPickerShow && (
        <CommunityDateTimePicker
          display={display as any}
          mode={mode === "datetime" ? androidDateTime.currentMode : mode}
          value={date}
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            if (mode === "datetime") {
              if (androidDateTime.currentMode === "date") {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  date: date || new Date(),
                  currentMode: "time",
                }));
              }
              if (androidDateTime.currentMode === "time") {
                setAndroidDateTime((initialValue) => ({
                  ...initialValue,
                  time: date || new Date(),
                }));
              }
              if (androidDateTime.currentMode === "time") {
                onChange(
                  event,
                  new Date(
                    androidDateTime.date.getFullYear(),
                    androidDateTime.date.getMonth(),
                    androidDateTime.date.getDate(),
                    androidDateTime.time.getHours(),
                    androidDateTime.time.getMinutes(),
                    androidDateTime.time.getSeconds(),
                    androidDateTime.time.getMilliseconds()
                  )
                );
              }
            } else {
              onChange(event, date);
            }
          }}
        />
      )}
      {Platform.OS === "ios" && isPickerShow && (
        <CommunityDateTimePicker
          display={display as any}
          mode={mode}
          value={date}
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
