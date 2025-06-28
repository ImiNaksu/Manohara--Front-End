import React from "react";
import "../styles/EmergencyHotlines.css";
import Header from "./Header";
import { Phone, MessageCircle, Send } from "lucide-react";

const EmergencyHotlines = () => {
  const hotlines = [
    {
      name: "National Mental Health Helpline",
      number: "1926",
      description: "Free 24/7 support for emotional distress",
      types: ["phone", "whatsapp"],
    },
    {
      name: "Sumithrayo",
      number: "011 269 6666",
      description: "Volunteer-based emotional support",
      types: ["phone"],
      website: "https://srilankasumithrayo.lk/",
    },
    {
      name: "CCCline",
      number: "1333",
      description:
        "Free telephone and chat-based mental health support (8 AM – 8 PM daily)",
      types: ["phone", "chat"],
    },
  ];

  const getHotlineTypeIcon = (type) => {
    switch (type) {
      case "phone":
        return <Phone className="hotline-icon phone" />;
      case "whatsapp":
        return <Send className="hotline-icon whatsapp" />;
      case "chat":
        return <MessageCircle className="hotline-icon chat" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="emergency-hotlines-container">
        <header className="emergency-hotlines-header">
          <h1>Need Help Right Now?</h1>
        </header>

        <div className="hotlines-list">
          {hotlines.map((hotline, index) => (
            <div key={index} className="hotline-card">
              <div className="hotline-header">
                <h2>{hotline.name}</h2>
                <div className="hotline-types">
                  {hotline.types.map((type) => (
                    <div key={type} className="hotline-type-icon">
                      {getHotlineTypeIcon(type)}
                    </div>
                  ))}
                </div>
              </div>

              <p className="hotline-description">
                {hotline.description}

                {hotline.website && (
                  <a
                    href={`https://${hotline.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {". "}Visit Website
                  </a>
                )}
              </p>

              <div className="hotline-actions">
                <a href={`tel:${hotline.number}`} className="call-button">
                  Call {hotline.number}
                </a>
              </div>
            </div>
          ))}
        </div>

        <footer className="emergency-hotlines-footer">
          <p>Stay Strong. Help is Available.</p>
        </footer>
      </div>
    </div>
  );
};

export default EmergencyHotlines;
