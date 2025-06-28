import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Header.css";
import userImg from "../img/userimg.png";
import { FaSignOutAlt } from "react-icons/fa";

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

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [stickerCounts, setStickerCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if decodedToken has necessary properties
        setUser({
          username: decodedToken.username || "User",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.username) {
      getStickerCount();
    }
  }, [user]);

  const getStickerCount = async () => {
    try {
      setLoading(true);
      const username = user.username;

      if (!username) {
        console.error("No username found in token");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/sticker?username=${encodeURIComponent(
          username
        )}`
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Count occurrences of each sticker type
      const counts = {};
      if (data.stickers && Array.isArray(data.stickers)) {
        data.stickers.forEach((stickerObj) => {
          if (stickerObj.sticker) {
            counts[stickerObj.sticker] = (counts[stickerObj.sticker] || 0) + 1;
          }
        });
      }

      setStickerCounts(counts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sticker counts:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutDialogOpen(false);
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo">
        <h3 onClick={() => navigate("/menu")}>Manohara</h3>
      </div>

      <div className="user-section">
        {user ? (
          <>
            <div
              className="sticker-badge"
              onClick={() => setIsStickerModalOpen(true)}
            >
              <span className="sticker-count">
                {Object.values(stickerCounts).reduce((a, b) => a + b, 0) || 0}
              </span>
              <span className="sticker-icon">🌟</span>
            </div>
            <span className="username">{user.username}</span>
          </>
        ) : (
          <span>Loading...</span>
        )}

        <div
          className="profile-container"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {user && <img src={userImg} alt="Profile" className="profile-pic" />}

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(false);
                  setIsStickerModalOpen(true);
                }}
              >
                My Stickers
              </div>
              <div
                className="dropdown-item logout-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(false);
                  setIsLogoutDialogOpen(true);
                }}
              >
                <FaSignOutAlt /> Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticker Collection Modal */}
      {isStickerModalOpen && (
        <div
          className="sticker-overlay"
          onClick={() => setIsStickerModalOpen(false)}
        >
          <div className="sticker-modal" onClick={(e) => e.stopPropagation()}>
            <h3>My Sticker Collection</h3>
            <p>
              You've collected{" "}
              {Object.values(stickerCounts).reduce((a, b) => a + b, 0) || 0}{" "}
              stickers so far!
            </p>

            {loading ? (
              <p>Loading your stickers...</p>
            ) : (
              <div className="sticker-grid">
                {stickers.map((sticker) => (
                  <div className="sticker-item" key={sticker.id}>
                    <img
                      src={sticker.image}
                      alt={`Sticker ${sticker.id}`}
                      className={
                        stickerCounts[sticker.id]
                          ? "collected"
                          : "not-collected"
                      }
                    />
                    <div className="sticker-count-badge">
                      {stickerCounts[sticker.id] || 0}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-close"
              onClick={() => setIsStickerModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Logout Dialog */}
      {isLogoutDialogOpen && (
        <div className="logout-overlay">
          <div className="logout-dialog">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="dialog-actions">
              <button
                className="btn btn-cancel"
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
