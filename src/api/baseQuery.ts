import { isAxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

import { axiosInstance } from "./axios";

export type ApiError = {
  status?: number;
  data?: unknown;
  message: string;
};

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
        const axiosError = error as AxiosError;
        return {
          error: {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            message: axiosError.message,
          },
        };
      }

      return { error: { message: "Unknown error" } };
    }
  };
