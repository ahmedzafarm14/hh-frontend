import { chatApiBase } from "./chatApiBase.js";

// REST endpoints mapped from HostelHub Chat API documentation
// Base URL: http://localhost:3002/api/chat

export const chatApi = chatApiBase.injectEndpoints({
  endpoints: (builder) => ({
    // Create or get a room between the current user and participantId
    createOrGetRoom: builder.mutation({
      query: ({ participantId }) => ({
        method: "POST",
        url: "/api/chat/rooms",
        body: { participantId },
      }),
      invalidatesTags: ["ChatRooms"],
    }),

    // Get my chat rooms
    getMyRooms: builder.query({
      query: () => ({
        method: "GET",
        url: "/api/chat/rooms",
      }),
      providesTags: ["ChatRooms"],
    }),

    // Get one room details
    getRoomById: builder.query({
      query: ({ roomId }) => ({
        method: "GET",
        url: `/api/chat/rooms/${roomId}`,
      }),
      providesTags: (_res, _err, { roomId }) => [{ type: "ChatRoom", id: roomId }],
    }),

    // Get messages
    getRoomMessages: builder.query({
      query: ({ roomId, page = 1, limit = 50 }) => ({
        method: "GET",
        url: `/api/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`,
      }),
      providesTags: (_res, _err, { roomId }) => [{ type: "ChatMessages", id: roomId }],
    }),

    // Send a message
    sendMessage: builder.mutation({
      query: ({ roomId, message }) => ({
        method: "POST",
        url: "/api/chat/messages",
        body: { roomId, message },
      }),
      invalidatesTags: (_res, _err, { roomId }) => [
        { type: "ChatMessages", id: roomId },
        { type: "ChatRooms" },
        { type: "UnreadCount" },
      ],
    }),

    // Mark as read
    markRoomRead: builder.mutation({
      query: ({ roomId }) => ({
        method: "PATCH",
        url: `/api/chat/rooms/${roomId}/read`,
      }),
      invalidatesTags: (_res, _err, { roomId }) => [
        { type: "ChatMessages", id: roomId },
        { type: "ChatRooms" },
        { type: "UnreadCount" },
      ],
    }),

    // Unread count for current user
    getUnreadCount: builder.query({
      query: () => ({
        method: "GET",
        url: "/api/chat/unread-count",
      }),
      providesTags: ["UnreadCount"],
    }),

    // Delete message
    deleteMessage: builder.mutation({
      query: ({ messageId }) => ({
        method: "DELETE",
        url: `/api/chat/messages/${messageId}`,
      }),
      invalidatesTags: ["ChatRooms", "UnreadCount"],
    }),
  }),
});

export const {
  useCreateOrGetRoomMutation,
  useGetMyRoomsQuery,
  useGetRoomByIdQuery,
  useGetRoomMessagesQuery,
  useSendMessageMutation,
  useMarkRoomReadMutation,
  useGetUnreadCountQuery,
  useDeleteMessageMutation,
} = chatApi;


