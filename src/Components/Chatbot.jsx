import React, { useMemo, useState } from "react";

const joinUrl = (baseUrl, path) => {
  const cleanBase = (baseUrl || "").replace(/\/$/, "");
  const cleanPath = (path || "").replace(/^\//, "");
  return `${cleanBase}/${cleanPath}`;
};

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: "init", role: "bot", text: "Hi! I\'m your assistant. Ask me anything.", timestamp: Date.now() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Prefer Vite-exposed envs; fall back to default localhost
  const apiBaseUrl = useMemo(
    () =>
      import.meta.env.VITE_CHATBOT_API_BASE_URL ||
      import.meta.env.VITE_API_BASE_URL ||
      "http://127.0.0.1:5000",
    []
  );
  const askEndpoint = useMemo(() => joinUrl(apiBaseUrl, "/ask"), [apiBaseUrl]);
  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await fetch(askEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed, n_results: 3 }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      // API response shape:
      // { success: true, data: { answer: string, ... }, ... }
      const answerFromApi = data?.data?.answer;
      const answer =
        typeof answerFromApi === "string"
          ? answerFromApi
          : answerFromApi != null
          ? JSON.stringify(answerFromApi)
          : "I'm sorry, I couldn't find an answer.";

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: String(answer || "I\'m sorry, I couldn\'t find an answer."),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: `err-${Date.now()}`,
        role: "bot",
        text: "Sorry, something went wrong. Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[28rem] bg-white border border-gray-200 rounded-xl shadow-2xl z-[60] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
        <div className="font-semibold">Virtual Assistant</div>
        <button
          onClick={onClose}
          className="text-white/90 hover:text-white focus:outline-none"
          aria-label="Close chatbot"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`${
                m.role === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
              } px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap break-words`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 border border-gray-200 px-3 py-2 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <textarea
            rows={1}
            className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            disabled={isSending || inputValue.trim().length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
