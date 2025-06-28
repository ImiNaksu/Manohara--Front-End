import { useState } from "react";
import ChatBotIcon from './ChatBotIcon';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import '../../styles/ChatBotScreen.css';
import Header from '../Header';

const ChatBotScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const userMessage = history[history.length - 1].text;
  
    setChatHistory((prev) => [
      ...prev,
      { role: "model", text: "Thinking..." }
    ]);
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/chat", requestOptions);
      if (!response.ok) throw new Error("Server error");
  
      const data = await response.json(); // Get bot response + classification
  
      setChatHistory((prev) =>
        prev.filter((msg) => msg.text !== "Thinking...")
      );
  
      // Attach classification to the user message
      setChatHistory((prev) => {
        const updatedHistory = [...prev];
        updatedHistory[updatedHistory.length - 1] = {
          ...updatedHistory[updatedHistory.length - 1],
          classification: data.classification ? "Depressed: Yes" : "Depressed: No"
        };
        return updatedHistory;
      });
  
      // Add bot's response
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: data.response },
      ]);
  
    } catch (error) {
      console.error("Error fetching bot response:", error.message);
    }
  };

  return (
    <div className="bla">
      <Header />
      <div className="container">
      <div className="chatbot-popup">
        <div className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon />
            <p className="message-text">How can I help you?</p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatBotScreen;
