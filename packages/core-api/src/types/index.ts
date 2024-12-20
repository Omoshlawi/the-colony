import { AxiosError } from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export type HiveFetchInit = Omit<AxiosRequestConfig, "url">;
export type HiveFetchResponse<T = any, K = any> = AxiosResponse<T, K>;
export type HiveFetchError<T = any, K = any> = AxiosError<T, K>;
