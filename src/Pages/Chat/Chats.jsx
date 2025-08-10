import React, { useEffect, useMemo, useRef, useState } from "react";
import { TextField, IconButton, Avatar, useMediaQuery, CircularProgress } from "@mui/material";
import {
  MoreVert,
  AttachFile,
  EmojiEmotions,
  Mic,
  Phone,
  Videocam,
  ArrowBack,
} from "@mui/icons-material";
import InputField from "../../Components/InputField.jsx";
import Typography from "../../Theme/Typography";
import Logo from "../../Assets/Logos/Logo.svg";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import {
  useGetMyRoomsQuery,
  useGetRoomMessagesQuery,
  useSendMessageMutation,
  useMarkRoomReadMutation,
} from "../../State/Services/chatQueries.js";
import { useSearchParams } from "react-router-dom";

// REST-backed chat view; rooms/messages loaded via RTK Query

export default function Chats() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.user.user || {});
  const meId = user?._id || user?.id || user?.userId || user?.uid || null;

  const { data: roomsResp, isLoading: roomsLoading, isFetching: roomsFetching, refetch: refetchRooms, error: roomsError } = useGetMyRoomsQuery();
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [markRead] = useMarkRoomReadMutation();

    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [socketError, setSocketError] = useState(null);
    const [optimisticMessages, setOptimisticMessages] = useState([]);

    const { data: messagesResp, isFetching: messagesFetching, refetch: refetchMessages, error: messagesError } = useGetRoomMessagesQuery(
      { roomId: selectedRoomId, page: 1, limit: 50 },
      { skip: !selectedRoomId }
    );
    
    const rooms = useMemo(() => {
      const d = roomsResp;
      // API docs: { success: true, data: { rooms: [...] } }
      return (
        d?.data?.rooms ||
        d?.rooms ||
        d?.data ||
        []
      );
    }, [roomsResp]);
    
    const messages = useMemo(() => {
      const d = messagesResp;
      // API docs: { success: true, data: { messages: [...] } }
      const apiMessages = (
        d?.data?.messages ||
        d?.messages ||
        d?.data ||
        []
      );
      
      // Combine API messages with optimistic messages
      const allMessages = [...apiMessages, ...optimisticMessages];
      
      // Sort by creation time
      return allMessages.sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
    }, [messagesResp, optimisticMessages]);
    
    const [searchParams] = useSearchParams();
    const targetRoomId = searchParams.get("roomId");

    const messagesEndRef = useRef(null);
    const joinedRoomRef = useRef(null);
    const socketRef = useRef(null);
    const token = useSelector((state) => state.user.token);
    // Socket should hit the dedicated chat backend
    const apiBaseUrl = import.meta.env.VITE_CHAT_BACKEND_URL || "http://localhost:3002";

    // Initialize socket connection & wire listeners
    useEffect(() => {
      if (!apiBaseUrl || !token) return;
      
      const socket = io(apiBaseUrl, {
        transports: ["websocket"],
        auth: { token },
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      socketRef.current = socket;

      // Connection event handlers
      socket.on("connect", () => {
        setSocketConnected(true);
        setSocketError(null);
        
        // If we have a selected room, join it immediately after connection
        if (selectedRoomId) {
          socket.emit("join:room", { roomId: selectedRoomId });
          joinedRoomRef.current = selectedRoomId;
        }
      });

      socket.on("connect_error", (error) => {
        setSocketConnected(false);
        setSocketError("Connection failed");
      });

      socket.on("disconnect", () => {
        setSocketConnected(false);
      });

      const onNewMessage = (payload) => {
        // Handle different payload structures
        let roomId = null;
        
        if (typeof payload === 'object') {
          roomId = payload?.roomId || 
                   payload?.room?._id || 
                   payload?.roomIdString ||
                   payload?.message?.roomId ||
                   payload?.data?.roomId;
        }
        
        // Always refetch rooms to update last message and unread count
        refetchRooms();
        
        // If this message is for the currently selected room, refetch messages
        if (roomId && selectedRoomId && String(roomId) === String(selectedRoomId)) {
          refetchMessages();
          
          // Scroll to bottom after a short delay to ensure new message is loaded
          setTimeout(() => {
            if (messagesEndRef.current) {
              messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      };

      const onRoomUpdated = () => {
        refetchRooms();
      };

      // Listen for all possible message events
      socket.on("new:message", onNewMessage);
      socket.on("message:sent", onNewMessage);
      socket.on("message:new", onNewMessage);
      socket.on("chat:message:new", onNewMessage);
      socket.on("chat:message:sent", onNewMessage);
      socket.on("message", onNewMessage);
      
      // Listen for room updates
      socket.on("messages:read", onRoomUpdated);
      socket.on("room:updated", onRoomUpdated);
      socket.on("chat:room:updated", onRoomUpdated);

      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("disconnect");
        socket.off("new:message", onNewMessage);
        socket.off("message:sent", onNewMessage);
        socket.off("message:new", onNewMessage);
        socket.off("chat:message:new", onNewMessage);
        socket.off("chat:message:sent", onNewMessage);
        socket.off("message", onNewMessage);
        socket.off("messages:read", onRoomUpdated);
        socket.off("room:updated", onRoomUpdated);
        socket.off("chat:room:updated", onRoomUpdated);
        socket.disconnect();
        socketRef.current = null;
        setSocketConnected(false);
        setSocketError(null);
      };
    }, [apiBaseUrl, token, selectedRoomId, refetchMessages, refetchRooms]);
    
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messagesResp]);

    const getOtherParticipant = (room) => {
      const participants = room?.participants || [];
      const others = participants.filter((p) => {
        const pid = p?._id || p?.id || p?.userId;
        return meId && pid !== meId;
      });
      const other = others[0] || participants[0] || {};
      // API docs: participants have userName, firstName, lastName, email
      const displayName = other?.userName || 
                         `${other?.firstName || ''} ${other?.lastName || ''}`.trim() || 
                         other?.email || 
                         "Chat";
      return { other, displayName };
    };

    const roomIdOf = (room) => room?._id || room?.id || room?.roomId || room?.room_id || null;

    // Auto-select a room from URL param when rooms are loaded
    useEffect(() => {
      if (!targetRoomId) return;
      if (String(selectedRoomId) === String(targetRoomId)) return;
      const room = rooms.find((r) => String(roomIdOf(r)) === String(targetRoomId));
      if (room) {
        handleChatChange(room);
      } else {
        // Fallback: open panel with minimal info; messages will still load by roomId
        setSelectedRoomId(targetRoomId);
        setCurrentChat({ id: targetRoomId, name: "Chat" });
        setShowChatPanel(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetRoomId, rooms]);

    // When selectedRoomId changes (e.g., via URL), join socket room and mark read
    useEffect(() => {
      if (!selectedRoomId) return;
      
      // Join room when socket is connected
      if (socketRef.current && socketRef.current.connected && joinedRoomRef.current !== selectedRoomId) {
        console.log("Joining room:", selectedRoomId);
        socketRef.current.emit("join:room", { roomId: selectedRoomId });
        joinedRoomRef.current = selectedRoomId;
      }
      
      // Mark messages as read
      (async () => {
        try {
          await markRead({ roomId: selectedRoomId }).unwrap();
        } catch (e) {
          console.warn("Failed to mark room as read:", e);
        }
      })();
    }, [selectedRoomId, markRead]);

    const handleSendMessage = async (e) => {
      e.preventDefault();
      const trimmedMessage = newMessage.trim();
      
      // Validation
      if (!trimmedMessage || !selectedRoomId) return;
      if (trimmedMessage.length > 1000) {
        alert("Message too long. Maximum 1000 characters allowed.");
        return;
      }
      if (trimmedMessage.length < 1) {
        alert("Message cannot be empty.");
        return;
      }
      
      // Check socket connection
      if (!socketConnected) {
        console.warn("Socket not connected, message may not be delivered in real-time");
      }
      
      // Add optimistic message
      const optimisticMessage = {
        _id: `temp-${Date.now()}`,
        message: trimmedMessage,
        senderId: { _id: meId },
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };
      
      setOptimisticMessages(prev => [...prev, optimisticMessage]);
      setNewMessage("");
      
      try {
        await sendMessage({ roomId: selectedRoomId, message: trimmedMessage }).unwrap();
        // Remove optimistic message after successful send
        setOptimisticMessages(prev => prev.filter(msg => msg._id !== optimisticMessage._id));
      } catch (err) {
        console.error("Failed to send message", err);
        // Remove optimistic message on error
        setOptimisticMessages(prev => prev.filter(msg => msg._id !== optimisticMessage._id));
        // Show user-friendly error
        alert("Failed to send message. Please try again.");
      }
    };

    const handleChatChange = async (room) => {
      const rid = roomIdOf(room);
      setSelectedRoomId(rid);
      const { displayName } = getOtherParticipant(room);
      setCurrentChat({ id: rid, name: displayName });
      setShowChatPanel(true);
      if (rid) {
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit("join:room", { roomId: rid });
        }
        try {
          await markRead({ roomId: rid }).unwrap();
        } catch (err) {
          // Handle silently
        }
      }
    };

    const handleBackToList = () => {
      setShowChatPanel(false);
    };

    return (
      <div className="flex h-[calc(100vh-64px)] min-h-0 gap-2">
        {/* Left Sidebar */}
        <div
          className={`md:w-full w-1/3 bg-LightBackground rounded-lg  border-r border-gray-200 flex flex-col min-h-0 ${
            showChatPanel ? "flex md:hidden" : "flex"
          }`}
        >
          <div className="p-2 mt-1">
            <InputField
              isRequired={true}
              height="40px"
              width="100%"
              placeholder="Search"
              type="search"
              name="usernameOrEmail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
                      <div className="flex items-center justify-between px-4 pb-2">
              <Typography variant={"h4"} className="font-semibold">
                Chats
              </Typography>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">
                  {socketConnected ? 'Connected' : socketError ? 'Error' : 'Connecting...'}
                </span>
              </div>
            </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {roomsLoading || roomsFetching ? (
              <div className="w-full flex justify-center py-8">
                <CircularProgress size={20} />
              </div>
            ) : roomsError ? (
              <div className="text-center text-red-500 py-8">
                Error loading chats: {roomsError.message || 'Unknown error'}
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No chats yet</div>
            ) : (
              rooms
                .filter((room) => {
                  const { displayName } = getOtherParticipant(room);
                  return displayName.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((room) => {
                  const { displayName } = getOtherParticipant(room);
                  const last = room?.lastMessage || {};
                  const lastText = last?.message || last?.text || last?.content || "";
                  const lastAt = last?.createdAt ? dayjs(last.createdAt).format("ddd, h:mm A") : "";
                  const unread = room?.unreadCount || 0;
                  const rid = roomIdOf(room);
                  const isActive = String(selectedRoomId) === String(rid);
                  return (
                    <div
                      key={rid}
                      className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer ${isActive ? "bg-gray-100" : ""}`}
                      onClick={() => handleChatChange(room)}
                    >
                      <Avatar src={`/placeholder.svg?height=40&width=40`} className="mr-3" />
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline">
                          <span className="font-medium">{displayName}</span>
                          <span className="text-xs text-gray-500">{lastAt}</span>
                  </div>
                        <Typography variant={"body1"} className="text-gray-600 truncate">
                          {lastText}
                  </Typography>
                </div>
                      {unread > 0 && (
                  <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {unread}
                  </div>
                )}
              </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Right Chat Panel */}
        <div
          className={`flex flex-col w-full min-h-0 ${
            showChatPanel ? "flex" : "flex md:hidden"
          }`}
        >
          {selectedRoomId && currentChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 sm:p-2 bg-AccentColor3 border-b rounded-t-lg border-gray-200">
                <div className="flex items-center">
                  {isMobile && (
                    <IconButton className="mr-2" onClick={handleBackToList}>
                      <ArrowBack fontSize="small" />
                    </IconButton>
                  )}

                  <Avatar
                    src="/placeholder.svg?height=40&width=40"
                    className="mr-3"
                  />
                  <div>
                    <Typography variant={"h6"} className="font-semibold">
                      {currentChat.name}
                    </Typography>
                    <Typography variant={"body1"} className=" text-gray-500">Conversation</Typography>
                  </div>
                </div>
                <div>
                  
                  <IconButton>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-LightBackground">
                {messagesFetching ? (
                  <div className="w-full flex justify-center py-4">
                    <CircularProgress size={20} />
                      </div>
                ) : messagesError ? (
                  <div className="text-center text-red-500 py-4">
                    Error loading messages: {messagesError.message || 'Unknown error'}
                  </div>
                ) : (
                  messages.map((m) => {
                    const meIdStr = meId != null ? String(meId) : "";
                    // Handle shapes: senderId as object or string
                    const senderIdObj = m?.senderId && typeof m.senderId === "object" ? m.senderId : null;
                    const senderIdRaw =
                      senderIdObj?._id ||
                      m?.sender?._id ||
                      m?.senderId ||
                      m?.from ||
                      m?.userId ||
                      m?.sender; // handle sender as plain string id
                    const senderIdStr = senderIdRaw != null ? String(senderIdRaw) : "";
                    const isExplicitMine = m?.isMe || m?.isMine || m?.direction === "outgoing" || m?.direction === "out";
                    const mine = Boolean(isExplicitMine || (meIdStr && senderIdStr && senderIdStr === meIdStr));

                    const text = m?.message || m?.text || m?.content || "";
                    const created = m?.createdAt ? dayjs(m.createdAt).format("ddd, h:mm A") : "";
                    return (
                      <div key={m?._id || m?.id} className={`flex ${mine ? "justify-end" : "justify-start"} mb-4`}>
                        <div className={`max-w-xs rounded-2xl p-3 ${mine ? "bg-blue-500 text-white" : "bg-white"}`}>
                          <Typography variant={"h6"}>{text}</Typography>
                          <div className={`text-xs mt-1 ${mine ? "text-blue-100" : "text-gray-500"}`}>{created}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-AccentColor3 border-t rounded-b-lg border-gray-200">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center bg-gray-100 rounded-full px-4 py-2"
                >
                  <IconButton size="small">
                    <AttachFile className="text-gray-500" fontSize="small" />
                  </IconButton>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                    className="mx-2"
                  />
                  <IconButton size="small">
                    <EmojiEmotions className="text-gray-500" fontSize="small" />
                  </IconButton>
                  <IconButton type="submit" size="small" className="bg-blue-500 text-white hover:bg-blue-600" disabled={sending}>
                    {sending ? <CircularProgress size={16} className="text-white" /> : <Mic fontSize="small" />}
                  </IconButton>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full bg-LightBackground rounded-lg flex justify-center items-center">
              <img src={Logo} alt="Logo" className="w-24 h-24" />
            </div>
          )}
        </div>
      </div>
    );
}
