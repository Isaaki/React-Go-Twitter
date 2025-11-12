import { useEffect, useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetField from "./TweetField";

import type { SortModeKeyType, Tweet } from "../utils/types";

import { SortMode } from "../utils/constants";

import "./MainPage.css";
import { useCurrentUser } from "../context/useUser";

export default function MainPage() {
  const [reloadTweetsKey, setReloadTweetsKey] = useState<number>(0);
  const [sortMode, setSortMode] = useState<SortModeKeyType>(SortMode.DEC);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { setCurrentUser } = useCurrentUser();
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tweets")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a: Tweet, b: Tweet) => tweetSort(a, b, sortMode));
        setTweets(data);
      })
      .catch(console.error);
  }, [reloadTweetsKey, sortMode]);

  function tweetPosted() {
    setReloadTweetsKey((k) => k + 1);
  }

  function tweetSort(a: Tweet, b: Tweet, mode: SortModeKeyType) {
    const aDate = Date.parse(a.createdAt);
    const bDate = Date.parse(b.createdAt);

    if (mode === SortMode.ASC) {
      return aDate - bDate; // ascending: older first
    } else {
      return bDate - aDate; // descending: newer first
    }
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
          `http://localhost:8080/user/profilePicture`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          },
        );

        const data = await response.json();
        setCurrentUser(data);
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
        <TweetFeed
          tweets={tweets}
          reloadTweetsKey={reloadTweetsKey}
          sortMode={sortMode}
        />
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
