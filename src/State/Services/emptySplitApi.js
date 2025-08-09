import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_LOCAL_URL,
    prepareHeaders: (headers, { endpoint, getState }) => {
      const token = getState().user?.token;
      if (endpoint !== "updateProfile") {
        headers.set("Content-Type", "application/json");
      }
      headers.set("accept", "application/json");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        headers.set("authorization", "");
      }

      return headers;
    },
  }),

  endpoints: () => ({}),
  tagTypes: ["Profile", "LogInStatus"],
});
