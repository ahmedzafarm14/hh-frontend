import React, { useState } from "react";
import { TextField, IconButton, Avatar, useMediaQuery } from "@mui/material";
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

const initialStudents = [
  {
    id: 1,
    name: "Anil",
    lastMessage: "April fool's day",
    time: "Today, 9:52pm",
    unread: 0,
  },
  {
    id: 2,
    name: "Ariba",
    lastMessage: "Baag",
    time: "Today, 12:11pm",
    unread: 1,
  },
  {
    id: 3,
    name: "maam",
    lastMessage: "You have to report it",
    time: "Today, 2:40pm",
    unread: 1,
  },
  {
    id: 4,
    name: "Bill Gates",
    lastMessage: "Nevermind bro",
    time: "Yesterday, 12:31pm",
    unread: 2,
  },
  {
    id: 5,
    name: "Victoria H",
    lastMessage: "Okay, Brother. let's see...",
    time: "Wednesday, 11:12am",
    unread: 0,
  },
  {
    id: 6,
    name: "Mano",
    lastMessage: "Nevermind bro",
    time: "Yesterday, 12:31pm",
    unread: 2,
  },
  {
    id: 7,
    name: "Habib",
    lastMessage: "Okay, Brother. let's see...",
    time: "Wednesday, 11:12am",
    unread: 0,
  },
];

const initialMessages = [
  { id: 1, text: "Hey There!", sender: "Anil", time: "Today, 8:30pm" },
  { id: 2, text: "How are you?", sender: "Anil", time: "Today, 8:30pm" },
  { id: 3, text: "Hello!", sender: "You", time: "Today, 8:33pm" },
  {
    id: 4,
    text: "I am fine and how are you?",
    sender: "You",
    time: "Today, 8:34pm",
  },
  {
    id: 5,
    text: "I am doing well, Can we meet tomorrow?",
    sender: "Anil",
    time: "Today, 8:36pm",
  },
  { id: 6, text: "Yes Sure!", sender: "You", time: "Today, 8:38pm" },
];

export default function Chats() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [students, setStudents] = useState(initialStudents);
  const [messages, setMessages] = useState(initialMessages);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      time: `Today, ${currentTime}`,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update last message for current chat
    setStudents(
      students.map((student) =>
        student.id === currentChat.id
          ? {
              ...student,
              lastMessage: newMessage,
              time: `Today, ${currentTime}`,
              unread: 0,
            }
          : student
      )
    );
  };

  const handleChatChange = (student) => {
    setCurrentChat(student);
    setShowChatPanel(true);
    setStudents(
      students.map((s) => (s.id === student.id ? { ...s, unread: 0 } : s))
    );
  };

  const handleBackToList = () => {
    setShowChatPanel(false);
  };

  return (
    <div className="flex h-screen gap-2">
      {/* Left Sidebar */}
      <div
        className={`md:w-full w-1/3 bg-LightBackground rounded-lg  border-r border-gray-200 flex flex-col ${
          showChatPanel ? "flex md:hidden" : "flex"
        }`}
      >
        <div className="p-2 mt-1">
          <InputField
            height="40px"
            width="100%"
            placeholder="Search"
            type="search"
            name="usernameOrEmail"
          />
        </div>
        <Typography variant={"h4"} className="font-semibold px-4 pb-2">
          Students
        </Typography>
        <div className="flex-grow overflow-y-auto">
          {students.map((student) => (
            <div
              key={student.id}
              className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                currentChat && currentChat.id === student.id
                  ? "bg-gray-100"
                  : ""
              }`}
              onClick={() => handleChatChange(student)}
            >
              <Avatar
                src={`/placeholder.svg?height=40&width=40`}
                className="mr-3"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">{student.name}</span>
                  <span className="text-xs text-gray-500">{student.time}</span>
                </div>
                <Typography
                  variant={"body1"}
                  className="text-gray-600 truncate"
                >
                  {student.lastMessage}
                </Typography>
              </div>
              {student.unread > 0 && (
                <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {student.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div
        className={`flex flex-col w-full  ${
          showChatPanel ? "flex" : "flex md:hidden"
        }`}
      >
        {currentChat ? (
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
                  <Typography variant={"body1"} className=" text-gray-500">
                    Online - Last seen, 2:02pm
                  </Typography>
                </div>
              </div>
              <div>
                <IconButton>
                  <Phone className="text-PrimaryColor" fontSize="small" />
                </IconButton>
                <IconButton>
                  <Videocam className="text-PrimaryColor" fontSize="small" />
                </IconButton>
                <IconButton>
                  <MoreVert fontSize="small" />
                </IconButton>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4 bg-LightBackground">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs rounded-2xl p-3 ${
                      message.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    <Typography variant={"h6"}>{message.text}</Typography>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "You"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
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
                <IconButton
                  type="submit"
                  size="small"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Mic fontSize="small" />
                </IconButton>
              </form>
            </div>
          </>
        ) : (
          <div className="h-screen bg-LightBackground rounded-lg flex justify-center items-center">
            <img src={Logo} alt="Logo" className="w-24 h-24" />
          </div>
        )}
      </div>
    </div>
  );
}
