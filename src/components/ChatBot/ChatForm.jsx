import React, { useRef } from "react";
import { TbSend } from "react-icons/tb";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    generateBotResponse(
      [...chatHistory, { role: "user", text: userMessage }],
      600
    );
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button class="icon-button">
        { <TbSend /> }
      </button>
    </form>
  );
};

export default ChatForm;
