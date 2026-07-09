import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/api/baseQuery";

export const casinoApi = createApi({
  reducerPath: "casinoApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
