import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Separate API base for chat server
// Configure with VITE_CHAT_BACKEND_URL (should be http://localhost:3002)

export const chatApiBase = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CHAT_BACKEND_URL || "http://localhost:3002",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      headers.set("accept", "application/json");
      headers.set("Content-Type", "application/json");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["ChatRooms", "ChatRoom", "ChatMessages", "UnreadCount"],
});


