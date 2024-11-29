import { AxiosRequestConfig, AxiosResponse } from "axios";

export type HiveFetchInit = Omit<AxiosRequestConfig, "url">;
export type HiveFetchResponse<T = any, K = any> = AxiosResponse<T, K>;
