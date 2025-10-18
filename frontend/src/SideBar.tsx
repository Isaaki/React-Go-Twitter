import { useState, useEffect } from "react";
import "./SideBar.css";
import type { User } from "./types";

export default function SideBar() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data[0]))
      .catch(console.error);
  }, [setUsers]);

  return (
    <>
      <div className="sidebar">
        {/*Twitter icon*/}
        <a href="index.html">
          <i id="twitter-icon" className="fab fa-twitter"></i>
        </a>
        {/*Navbar*/}
        <nav className="navbar">
          <a className="navbar-item" href="index.html">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-home"></i>
              </div>
              <div className="navbar-text">Home</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-hashtag"></i>
              </div>
              <div className="navbar-text">Explore</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <div className="badge">10</div>
                <i className="fas fa-bell"></i>
              </div>
              <div className="navbar-text">Notifications</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="navbar-text">Messages</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-bookmark"></i>
              </div>
              <div className="navbar-text">Bookmarks</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-list"></i>
              </div>
              <div className="navbar-text">Lists</div>
            </div>
          </a>
          <a className="navbar-item" href="#">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-user"></i>
              </div>
              <div className="navbar-text">Profile</div>
            </div>
          </a>
          <button className="navbar-more-menu">
            <div className="navbar-text-container">
              <div className="navbar-icon-container">
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <div className="navbar-text">More</div>
            </div>
            <div id="navbar-more-dropdown" className="dropdown-content">
              <a href="#">Topics</a>
              <a href="#">Test</a>
              <a href="#">Test</a>
              <a href="#">Test</a>
              <a href="#">Test</a>
              <a href="#">Test</a>
            </div>
          </button>
        </nav>
        {/*Tweet button*/}
        <button className="tweet-button">Tweet</button>
        <button className="profile-container">
          <div className="avatar"></div>

          <div className="profile-username-container">
            <div className="profile-name">{users?.name}</div>
            <div className="profile-username">@{users?.username}</div>
          </div>

          <div className="profile-dots">
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </button>
      </div>
    </>
  );
}
