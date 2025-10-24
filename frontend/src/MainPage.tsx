import { useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetField from "./TweetField";

import type { SortModeKeyType } from "./types";
import { SortMode } from "./constants";

import "./MainPage.css";

export default function MainPage() {
  const [reloadTweetsKey, setReloadTweetsKey] = useState<number>(0);
  const [sortMode, setSortMode] = useState<SortModeKeyType>(SortMode.DEC);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  function tweetPosted() {
    setReloadTweetsKey((k) => k + 1);
  }

  function cycleSort() {
    if (sortMode === SortMode.DEC) {
      setSortMode(SortMode.ASC);
    } else {
      setSortMode(SortMode.DEC);
    }
  }

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (profilePic) {
      const formData = new FormData();
      formData.append("file", profilePic);

      try {
        const response = await fetch(
          `http://localhost:8080/api/user/${localStorage.getItem("userID")}/profilePicture`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();
        localStorage.setItem("profilePicUrl", data.url);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  return (
    <div id="main-content">
      <div id="div-feed" className="main-feed">
        <div className="feed-header">
          <a href="#">Home</a>
          <button className="feed-header-icon">
            <i className="fas fa-star"></i>
          </button>
        </div>
        <TweetField tweetPosted={tweetPosted} />
        <TweetFeed reloadTweetsKey={reloadTweetsKey} sortMode={sortMode} />
      </div>
      <div className="side-content">
        <div>
          <p>User info</p>
          <input id="name" type="text" placeholder="name" />
          <input id="userName" type="text" placeholder="UserName" />
          <button
            id="add-user"
            style={{
              border: "1px solid gray",
              padding: "4px",
              margin: "2px",
            }}
          >
            Add user
          </button>
        </div>
        <button id="add-tweets-to-feed">addTweetsToFeed</button>
        <button onClick={cycleSort}>Sort Mode</button>
        <div className="input-container">
          <input
            id="input-profile-picture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {profilePic && <p>File name: {profilePic.name}</p>}
          {profilePic && (
            <button
              className="submit"
              style={{
                border: "1px solid gray",
                padding: "2px",
              }}
              onClick={handleProfilePictureUpload}
            >
              Upload a file
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
