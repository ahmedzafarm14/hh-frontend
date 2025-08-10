import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({

    baseUrl: import.meta.env.VITE_BACKEND_PRODUCTION_URL,
    prepareHeaders: (headers, { endpoint, getState }) => {

    //baseUrl: import.meta.env.VITE_BACKEND_LOCAL_URL,
    prepareHeaders: (headers, { endpoint, getState, extra }) => {

      const token = getState().user?.token;

      // Don't set Content-Type for endpoints that handle FormData
      if (
        endpoint !== "updateProfile" &&
        endpoint !== "addHostel" &&
        endpoint !== "updateHostel"
      ) {
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
  tagTypes: [
    "Profile",
    "LogInStatus",
    // Chat related tags
    "ChatRooms",
    "ChatRoom",
    "ChatMessages",
    "UnreadCount",
  ],
});
