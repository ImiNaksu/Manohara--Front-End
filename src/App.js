import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Community from "./components/Community";
import Menu from "./components/Menu";
import ChatBotScreen from "./components/ChatBot/ChatBotScreen";
import EmergencyHotlines from "./components/EmergencyHotline";
import MentalHealthResources from "./components/MentalHealthResources";
import MoodCalendar from "./components/Calender/Calender";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chatbot" element={<ChatBotScreen />} />
        <Route path="/resources" element={<MentalHealthResources />} />
        <Route path="/community" element={<Community />} />
        <Route path="/crisis-assistance" element={<EmergencyHotlines />} />
        <Route path="/mood-tracking" element={<MoodCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
