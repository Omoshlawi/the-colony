import React, { useState, useEffect, FC, useMemo } from "react";
import * as Icons from "@expo/vector-icons";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  ExpoIcon,
  ExpoIconComponent,
  ExpoIconFamily,
  getExpoIconFamiliesNames,
  getExpoIcons,
} from "./helpers";

type ExpoIconPickerProps = {
  onSelectIcon?: (selected: ExpoIcon) => void;
};

const ExpoIconPicker: FC<ExpoIconPickerProps> = ({ onSelectIcon }) => {
  const icons = useMemo(() => getExpoIcons(), []);
  const iconsFamiliesNames = useMemo(() => getExpoIconFamiliesNames(), []);

  const [selectedFamily, setSelectedFamily] =
    useState<ExpoIconFamily>("MaterialIcons");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<ExpoIcon | null>(null);

  const filteredIcons = icons.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(icons);

  const handleIconSelect = (icon: ExpoIcon) => {
    setSelectedIcon(icon);
    onSelectIcon?.(icon);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Search Input */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          marginBottom: 16,
        }}
        placeholder="Search icons..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Icon Family Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        {iconsFamiliesNames.map((family) => (
          <TouchableOpacity
            key={family}
            onPress={() => setSelectedFamily(family)}
            style={{
              padding: 8,
              marginRight: 8,
              backgroundColor:
                family === selectedFamily ? "#007AFF" : "#EEEEEE",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: family === selectedFamily ? "white" : "black",
                fontSize: 12,
              }}
            >
              {family}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Icon Display */}
      {selectedIcon && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#E3F2FD",
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <ExpoIconComponent {...selectedIcon} />
          <Text style={{ marginLeft: 8 }}>
            {selectedIcon.family} / {selectedIcon.name}
          </Text>
        </View>
      )}

      {/* Icons Grid */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {filteredIcons.map((icon, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => handleIconSelect(icon)}
              style={{
                width: "23%",
                aspectRatio: 1,
                padding: 8,
                marginBottom: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  selectedIcon?.name === icon.name ? "#E3F2FD" : "transparent",
                borderRadius: 8,
                borderWidth: selectedIcon?.name === icon.name ? 2 : 0,
                borderColor: "#007AFF",
              }}
            >
              <ExpoIconComponent {...icon} />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                {icon.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExpoIconPicker;
