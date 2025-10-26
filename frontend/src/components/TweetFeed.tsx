import { useState, useEffect } from "react";
import type { Tweet, SortModeKeyType } from "../utils/types";
import { SortMode } from "../utils/constants";
import { RelativeTimeDisplay } from "../utils/functions";

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
    const aDate = Date.parse(a.CreatedAt);
    const bDate = Date.parse(b.CreatedAt);

    if (mode === SortMode.ASC) {
      return aDate - bDate; // ascending: older first
    } else {
      return bDate - aDate; // descending: newer first
    }
  }

  const tweetItems = tweets.map((tweet) => {
    return (
      <div id="tweet-copy" key={tweet.ID}>
        <div className="tweet-feed-container">
          <a href="#" className="avatar-normal-container">
            <div className="avatar-normal">
              <img src={tweet.User.ProfilePicUrl}></img>
            </div>
          </a>
          <div className="tweet-container">
            <div className="tweet-info">
              <a id="tweet-info-name" href="#">
                {tweet.User.Name}
              </a>
              <a id="tweet-info-username" href="#">
                @{tweet.User.Username}
              </a>
              <div>·</div>
              <div id="tweet-info-date">
                {RelativeTimeDisplay(new Date(tweet.CreatedAt))}
              </div>
              <div>
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div className="tweet-div">
              <p className="tweet-div-text">{tweet.Message}</p>
              <div className="tweet-div-buttons">
                <button className="tweet-div-button">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-reply">{tweet.Replies}</span>
                </button>
                <button className="tweet-div-button tweet-main-retweet">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-retweet">{tweet.Retweets}</span>
                </button>
                <button className="tweet-div-button tweet-main-like">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-like">{tweet.Likes}</span>
                </button>
                <button className="tweet-div-button">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span id="tweet-like">{tweet.Views}</span>
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
