import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/api/baseQuery";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
