import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { Tweet, SortModeKeyType } from "../utils/types";
import { SortMode } from "../utils/constants";
import { RelativeTimeDisplay } from "../utils/time";

import "./TweetFeed.css";

export default function TweetFeed({
  reloadTweetsKey: reloadTweetsKey,
  sortMode: sortMode,
}: {
  reloadTweetsKey: number;
  sortMode: SortModeKeyType;
}) {
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

  function tweetSort(a: Tweet, b: Tweet, mode: SortModeKeyType) {
    const aDate = Date.parse(a.createdAt);
    const bDate = Date.parse(b.createdAt);

    if (mode === SortMode.ASC) {
      return aDate - bDate; // ascending: older first
    } else {
      return bDate - aDate; // descending: newer first
    }
  }

  const tweetItems = tweets.map((tweet) => {
    return (
      <div id="tweet-copy" key={tweet.id}>
        <div className="tweet-feed-container">
          <Link
            to={`/user/${tweet.user.username}`}
            className="avatar-normal-container"
          >
            <div className="avatar-normal">
              {tweet.user.profilePicUrl && (
                <img src={tweet.user.profilePicUrl}></img>
              )}
            </div>
          </Link>
          <div className="tweet-container">
            <Link to={`/user/${tweet.user.username}`} className="tweet-info">
              <div className="tweet-info-text">{tweet.user.name}</div>
              <div className="tweet-info-text">@{tweet.user.username}</div>
              <div>·</div>
              <div>{RelativeTimeDisplay(new Date(tweet.createdAt))}</div>
              <div>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </Link>
            <div className="tweet-div">
              <p className="tweet-div-text">{tweet.message}</p>
              <div className="tweet-div-buttons">
                <button className="tweet-div-button">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-reply">{tweet.replies}</span>
                </button>
                <button className="tweet-div-button tweet-main-retweet">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-retweet">{tweet.retweets}</span>
                </button>
                <button className="tweet-div-button tweet-main-like">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-like">{tweet.likes}</span>
                </button>
                <button className="tweet-div-button">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-like">{tweet.views}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <>{tweetItems}</>;
}
