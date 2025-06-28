import React, { useState, useEffect } from "react";
import "../styles/Menu.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Smile,
  Bot,
  Library,
  AlertTriangle,
  Users,
  Construction,
} from "lucide-react";

import st1 from "../img/stickers/1.png";
import st2 from "../img/stickers/2.png";
import st3 from "../img/stickers/3.png";
import st4 from "../img/stickers/4.png";
import st5 from "../img/stickers/5.png";

const stickers = [
  { id: "st1", image: st1 },
  { id: "st2", image: st2 },
  { id: "st3", image: st3 },
  { id: "st4", image: st4 },
  { id: "st5", image: st5 },
];

const ManoharaWellness = () => {
  const navigate = useNavigate();
  const [showStickerPopup, setShowStickerPopup] = useState(false);
  const [currentSticker, setCurrentSticker] = useState(null);
  const [user, setUser] = useState(null);

  // First useEffect to decode token and set user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  // Second useEffect to check for stickers - now depends on user state
  useEffect(() => {
    // Only run this effect when user is loaded
    if (!user) return;

    const checkAndShowSticker = async () => {
      try {
        const username = user.username;

        if (!username) {
          console.error("No username found in token");
          return;
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // Check if user already has a sticker for today
        const response = await fetch(
          `http://localhost:5000/api/sticker?username=${encodeURIComponent(
            username
          )}`
        );

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        const userStickers = data.stickers || [];
        const hasSticker = userStickers.some((s) => s.date === today);

        if (!hasSticker) {
          // Select a random sticker
          const randomIndex = Math.floor(Math.random() * stickers.length);
          const selectedSticker = stickers[randomIndex];
          setCurrentSticker(selectedSticker);

          // Show popup after 3 seconds
          setTimeout(() => {
            setShowStickerPopup(true);
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking stickers:", error);
      }
    };

    checkAndShowSticker();
  }, [user]); // This useEffect now depends on user state

  const handleAddSticker = async () => {
    try {
      if (!user || !user.username) {
        console.error("No user found");
        return;
      }

      const username = user.username;
      const today = new Date().toISOString().split("T")[0];

      const response = await fetch("http://localhost:5000/api/sticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          sticker: currentSticker.id,
          date: today,
        }),
      });

      if (response.ok) {
        setShowStickerPopup(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error saving sticker:", errorData.message);
      }
    } catch (error) {
      console.error("Error saving sticker:", error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: "Mood Tracking",
      actionText: "ADD NOW",
      bgColor: "bg-peach",
      icon: Smile,
      description: "Reflect, record, and rediscover yourself.",
    },
    {
      id: 2,
      title: "AI Wellness Assistant",
      actionText: "CHAT NOW",
      bgColor: "bg-mint",
      icon: Bot,
      description: "Intelligent care, always by your side.",
    },
    {
      id: 3,
      title: "Resource Library",
      actionText: "VIEW NOW",
      bgColor: "bg-lavender",
      icon: Library,
      description: "Your go-to hub for mental well-being.",
    },
    {
      id: 4,
      title: "Real-Time Crisis Assistance",
      actionText: "CONTACT NOW",
      bgColor: "bg-lightblue",
      icon: AlertTriangle,
      description: "Support at the speed of need.",
    },
    {
      id: 5,
      title: "Community Support",
      actionText: "COMMUNITY",
      bgColor: "bg-pink",
      icon: Users,
      description: "Find strength in shared experiences.",
    },
    {
      id: 6,
      title: "Professional Integration",
      actionText: "COMING SOON",
      bgColor: "bg-white",
      icon: Construction,
      description: "Connecting you to expert care effortlessly.",
    },
  ];

  // Navigation handler
  const handleNavigation = (item) => {
    const routes = {
      1: "/mood-tracking",
      2: "/chatbot",
      3: "/resources",
      4: "/crisis-assistance",
      5: "/community",
      6: null,
    };

    if (routes[item.id]) {
      navigate(routes[item.id]);
    } else {
      alert("Feature coming soon!");
    }
  };

  return (
    <div className="main">
      <Header />
      <div className="manohara-wellness-container">
        <header className="wellness-header">
          <h1>Discover How Manohara Supports Your Mental Wellness Journey</h1>
          <p>Make your peace of mind unforgettable.</p>
        </header>

        <div className="wellness-menu-grid">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`wellness-menu-item ${item.bgColor}`}
              >
                <div className="menu-item-icon">
                  <IconComponent size={60} strokeWidth={1.5} />
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button
                  className="menu-action-button"
                  onClick={() => handleNavigation(item)}
                >
                  {item.actionText}
                </button>
              </div>
            );
          })}
        </div>

        {showStickerPopup && currentSticker && (
          <div className="sticker-popup-overlay">
            <div className="sticker-popup">
              <h2>Congratulations!</h2>
              <p>You received a new sticker</p>
              <div className="sticker-image">
                <img src={currentSticker.image} alt="Sticker" />
              </div>
              <button className="sticker-add-button" onClick={handleAddSticker}>
                Add to My Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManoharaWellness;
