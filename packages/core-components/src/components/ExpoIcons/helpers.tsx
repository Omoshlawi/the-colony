import * as Icons from "@expo/vector-icons";
import React, { FC } from "react";

const EXPO_ICON_FAMILIES = {
  AntDesign: Icons.AntDesign,
  Entypo: Icons.Entypo,
  EvilIcons: Icons.EvilIcons,
  Feather: Icons.Feather,
  FontAwesome: Icons.FontAwesome,
  FontAwesome5: Icons.FontAwesome5,
  FontAwesome6: Icons.FontAwesome6,
  Fontisto: Icons.Fontisto,
  Foundation: Icons.Foundation,
  Ionicons: Icons.Ionicons,
  MaterialIcons: Icons.MaterialIcons,
  MaterialCommunityIcons: Icons.MaterialCommunityIcons,
  SimpleLineIcons: Icons.SimpleLineIcons,
  Octicons: Icons.Octicons,
  Zocial: Icons.Zocial,
};

export type ExpoIconFamily = keyof typeof EXPO_ICON_FAMILIES;
export type ExpoIcon = { family: ExpoIconFamily; name: string };

export const getExpoIcons = (
  families: ExpoIconFamily[] = getExpoIconFamiliesNames()
) => {
  // Get icon names from the selected family
  return families.reduce<ExpoIcon[]>((prev, family) => {
    const IconComponent = EXPO_ICON_FAMILIES[family];
    if (IconComponent?.glyphMap) {
      const iconNames = Object.keys(IconComponent.glyphMap);
      //   return [...prev, ...iconNames.map((icon) => ({ family, name: icon }))];
      const categoryIcons: ExpoIcon[] = iconNames.map((name) => ({
        name,
        family,
      }));
      return [...prev, ...categoryIcons];
    }
    return prev;
  }, []);
};

export const getExpoIconFamiliesNames = () =>
  Object.keys(EXPO_ICON_FAMILIES) as ExpoIconFamily[];

type ExpoIconComponentProps = ExpoIcon & {
  size?: number;
  color?: string;
};

export const ExpoIconComponent: FC<ExpoIconComponentProps> = ({
  family,
  name,
  color = 24,
  size = "#007AFF",
}) => {
  const IconComponent = EXPO_ICON_FAMILIES[family];
  return <IconComponent name={name} size={size} color={color} />;
};
