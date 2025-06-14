import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_BACKEND_PRODUCTION_URL,
    baseUrl: import.meta.env.VITE_BACKEND_LOCAL_URL,
    credentials: "include", // It includes cookies
    prepareHeaders: (headers, { getState }) => {
      headers.set("accept", "application/json");
      headers.set("Content-Type", "application/json");
      try {
        const { token } = getState().reducer.user;
        console.log("getState", getState);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        } else {
          headers.set("authorization", "");
        }
      } catch (err) {
        headers.set("authorization", "");
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
  tagTypes: ["Profile", "LogInStatus"],
});
