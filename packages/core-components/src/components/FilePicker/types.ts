export interface ExpoImageAsset {
  assets: Asset[];
  canceled: boolean;
}

type Asset = ExpoWebAsset | ExpoAndroidAsset | ExpoIOSAsset;

interface ExpoAsset {
  assetId: any;
  base64: any;
  duration: any;
  exif: any;
  fileName: string;
  fileSize: number;
  height: number;
  mimeType: string;
  rotation: any;
  type: string;
  uri: string;
  width: number;
}

export type ExpoWebAsset = Pick<
  ExpoAsset,
  "fileName" | "height" | "mimeType" | "uri"
>;
export type ExpoIOSAsset = Omit<ExpoAsset, "rotation">;
export type ExpoAndroidAsset = ExpoAsset;

export interface FilePickerBaseInputProps {
  multiple?: boolean;
  renderTrigger?: (onPress: () => void) => React.ReactElement;
}
