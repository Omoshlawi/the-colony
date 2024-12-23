import { AxiosError } from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export type HiveFetchInit = Omit<AxiosRequestConfig, "url">;
export type HiveFetchResponse<T = any, K = any> = AxiosResponse<T, K>;
export type HiveFetchError<T = any, K = any> = AxiosError<T, K>;

export interface HiveFileUpload {
  [fieldName: string]: HiveFile[];
}

export interface HiveFile {
  id: string;
  path: string;
  bytesSize: string;
  memeType: string;
  organizationId: string;
  organization?: any;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}
