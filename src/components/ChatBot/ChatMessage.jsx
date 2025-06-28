import React from "react";
import ChatBotIcon from "./ChatBotIcon";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <ChatBotIcon />}

      {chat.role === "user" && (
        <div className="user-container">
          <p className="message-text">{chat.text}</p>
          {chat.classification && (
            <p className="classification">{chat.classification}</p>
          )}
        </div>
      )}

      {chat.role === "model" && (
        <p className="message-text"><ReactMarkdown>{chat.text}</ReactMarkdown></p>
      )}
    </div>
  );
};

export default ChatMessage;