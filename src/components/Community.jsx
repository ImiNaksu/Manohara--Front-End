import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Plus, ThumbsUp, Trash2, X } from 'lucide-react';
import "../styles/Community.css";
import Header from './Header';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

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

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/community");
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleSubmit = async () => {
    if (!text) return;
    const newComment = {
      username: user.username,
      email: user.email,
      text,
    };
    await fetch("http://localhost:5000/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    setText("");
    setShowNewPostModal(false);
    fetchComments();
  };

  const handleLike = async (id) => {
    const res = await fetch(`http://localhost:5000/api/community/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    const updatedComment = await res.json();
    setComments(
      comments.map((comment) => (comment._id === id ? updatedComment : comment))
    );
  };

  const handleDelete = async () => {
    if (!commentToDelete) return;
    
    await fetch(`http://localhost:5000/api/community/${commentToDelete._id}`, {
      method: "DELETE",
    });
    setShowDeleteConfirmModal(false);
    setCommentToDelete(null);
    fetchComments();
  };

  const formatTime = (time) => new Date(time).toLocaleString();

  const isLikedByUser = (likes) => 
    likes.includes(user.email);

  return (
    <div className="community-container">
      <Header />
      <div className="community-content">
        <h2 className="community-title">Community Comments</h2>
        
        <div className="comments-grid">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-card-header">
                <div className="comment-user-info">
                  <strong>{comment.username}</strong>
                  <span className="comment-time">
                    {formatTime(comment.time)}
                  </span>
                </div>
                {user.email === comment.email && (
                  <button 
                    className="delete-icon"
                    onClick={() => {
                      setCommentToDelete(comment);
                      setShowDeleteConfirmModal(true);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="comment-card-text">{comment.text}</p>
              <div className="comment-card-footer">
                <button 
                  className={`like-button ${isLikedByUser(comment.likes) ? 'liked' : ''}`}
                  onClick={() => handleLike(comment._id)}
                >
                  <ThumbsUp size={18} />
                  <span>{comment.likes.length}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="new-post-button"
          onClick={() => setShowNewPostModal(true)}
        >
          <Plus size={24} /> New Post
        </button>

        {showNewPostModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="modal-textarea"
              />
              <div className="modal-actions">
                <button 
                  className="discard-button"
                  onClick={() => {
                    setShowNewPostModal(false);
                    setText("");
                  }}
                >
                  <X size={18} /> Discard
                </button>
                <button 
                  className="post-button"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm">
              <h3>Delete Comment</h3>
              <p>Are you sure you want to delete this comment?</p>
              <div className="modal-actions">
                <button 
                  className="discard-button"
                  onClick={() => {
                    setShowDeleteConfirmModal(false);
                    setCommentToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="delete-button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;