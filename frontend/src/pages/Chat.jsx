import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const TYPING_DELAY = 30; // ms per character

const Chat = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;
    setConversation((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");
    if (socket) {
      socket.emit("ai-message", message);
      setIsTyping(true);
    }
  };

  const typeBotResponse = (fullText) => {
    setIsTyping(true);
    let i = 0;
    const typeNext = () => {
      setConversation((prev) => {
        if (!prev.length || prev[prev.length - 1].sender !== "bot") {
          return [...prev, { text: fullText.charAt(0), sender: "bot" }];
        }
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: fullText.slice(0, i + 1),
        };
        return updated;
      });
      i++;
      if (i < fullText.length) {
        typingTimeoutRef.current = setTimeout(typeNext, TYPING_DELAY);
      } else {
        setTimeout(() => setIsTyping(false), 600);
      }
    };
    typeNext();
  };

  useEffect(() => {
    const socketInstance = io("https://ai-chat-bot-jart.onrender.com");
    setSocket(socketInstance);
    socketInstance.on("ai-message-res", typeBotResponse);
    return () => {
      socketInstance.disconnect();
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="flex flex-col h-screen bg-gray-950 ">
      {/* Chat Header */}
      <div className="border-b border-gray-600 text-white px-4 lg:px-6 py-5 tracking-wider flex justify-between items-center font-bold">
        <h2 className="text-[#cacccf] px-2 text-xl lg:text-2xl font-semibold">
          ChatGPT
        </h2>
        <i className="ri-more-2-fill lg:text-xl cursor-pointer"></i>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:px-10 space-y-3 scrollbar-hide">
        {conversation.length === 0 ? (
          <div className="flex justify-center items-center h-full italic">
            <h2 className="text-[#cacccf] font-semibold">
              Start the Conversation
            </h2>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative px-6 py-2 rounded-lg lg:max-w-[70%] break-words ${
                  msg.sender === "user"
                    ? "max-w-[75%] bg-[#303030db] text-white lg:text-lg rounded-br-none"
                    : "font-semibold text-amber-50 lg:text-lg bg-[#303030db] rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {isTyping && <div className="bot-msg typing-indicator">...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center px-4 py-4 lg:px-40">
        <input
          type="text"
          className="flex-1 border border-amber-50 text-white text-lg rounded-full px-5 py-2 lg:py-3 outline-none placeholder:text-amber-50 focus:ring focus:ring-[#cacccf]"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-3 px-3 lg:px-4 py-2 lg:py-3 bg-gray-600 text-white font-semibold rounded-full active:scale-90 cursor-pointer"
          onClick={handleSend}
        >
          <i className="ri-arrow-up-line text-2xl font-normal"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
