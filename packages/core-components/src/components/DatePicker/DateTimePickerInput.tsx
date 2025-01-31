import {
  StyleSheet,
  View,
  Platform,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import { default as React, useState, useCallback } from "react";
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
  formatter?: (date: Date) => string;
  mode?: "date" | "time" | "datetime" | "countdown";
  display?: "spinner" | "compact" | "default";
  error?: string;
  helpText?: string;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  onDateChanged,
  formatter,
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

  const [iosDateTime, setIosDateTime] = useState<Date>(date);

  const handleAndroidChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      // Handle Android cancel/dismiss scenarios
      if (event.type === "dismissed") {
        setIsPickerShow(false);
        // Reset to initial state for datetime mode
        if (mode === "datetime") {
          setAndroidDateTime({
            date: date,
            time: date,
            currentMode: "date",
          });
        }
        return;
      }

      if (mode === "datetime") {
        if (androidDateTime.currentMode === "date" && selectedDate) {
          setAndroidDateTime((prev) => ({
            ...prev,
            date: selectedDate,
            currentMode: "time",
          }));
        } else if (androidDateTime.currentMode === "time" && selectedDate) {
          const finalDate = new Date(
            androidDateTime.date.getFullYear(),
            androidDateTime.date.getMonth(),
            androidDateTime.date.getDate(),
            selectedDate.getHours(),
            selectedDate.getMinutes(),
            selectedDate.getSeconds(),
            selectedDate.getMilliseconds()
          );
          onDateChanged(finalDate);
          setIsPickerShow(false);
          setAndroidDateTime((prev) => ({
            date: date,
            time: date,
            currentMode: "date",
          }));
        }
      } else {
        if (selectedDate) onDateChanged(selectedDate);
        setIsPickerShow(false);
      }
    },
    [mode, androidDateTime, onDateChanged, date]
  );

  const handleIosChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (event.type === "dismissed") {
        setIsPickerShow(false);
        return;
      }

      if (selectedDate) {
        if (mode === "datetime") {
          setIosDateTime(selectedDate);
          onDateChanged(selectedDate);
        } else {
          onDateChanged(selectedDate);
          setIsPickerShow(false);
        }
      }
    },
    [mode, onDateChanged]
  );

  const toggleShowPicker = useCallback(() => {
    setIsPickerShow((prev) => !prev);
  }, []);

  const renderAndroidPicker = () => (
    <CommunityDateTimePicker
      display={display as any}
      mode={mode === "datetime" ? androidDateTime.currentMode : mode}
      value={
        mode === "datetime" && androidDateTime.currentMode === "time"
          ? androidDateTime.time
          : date
      }
      onChange={handleAndroidChange}
    />
  );

  const renderIosPicker = () => (
    <CommunityDateTimePicker
      display={display as any}
      mode={mode}
      value={mode === "datetime" ? iosDateTime : date}
      onChange={handleIosChange}
    />
  );

  const formatDate = useCallback(
    (dateToFormat: Date) => {
      if (formatter) return formatter(dateToFormat);

      switch (mode) {
        case "time":
          return dateToFormat.toLocaleTimeString();
        case "datetime":
          return dateToFormat.toLocaleString();
        default:
          return dateToFormat.toLocaleDateString();
      }
    },
    [formatter, mode]
  );

  return (
    <Box width={"100%"} gap={"s"}>
      <TextInput
        {...props}
        value={formatDate(date)}
        onPress={toggleShowPicker}
        editable={false}
        readOnly={true}
        suffixIcon={
          <ExpoIconComponent family="MaterialCommunityIcons" name="calendar" />
        }
        onSuffixIconPressed={toggleShowPicker}
      />

      {isPickerShow &&
        (Platform.OS === "android" ? renderAndroidPicker() : renderIosPicker())}
    </Box>
  );
};

export default DateTimePicker;
