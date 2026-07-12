import { isAxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";

import { axiosInstance } from "./axios";

export type ApiError = {
  status?: number;
  message: string;
};

export function isApiError(error: unknown): error is ApiError {
  return typeof (error as ApiError | undefined)?.message === "string";
}

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  body?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async ({ url, method = "GET", body, params }) => {
    try {
      const result = await axiosInstance({ url, method, data: body, params });
      return { data: result.data };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status,
            message: error.message,
          },
        };
      }

      return { error: { message: "Unknown error" } };
    }
  };
