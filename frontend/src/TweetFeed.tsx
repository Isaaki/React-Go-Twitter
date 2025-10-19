import { useState, useEffect } from "react";
import type { Tweet } from "./types";
import "./TweetFeed.css";

export default function TweetFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tweets")
      .then((res) => res.json())
      .then((data) => setTweets(data))
      .catch(console.error);
  }, [setTweets]);

  const tweetItems = tweets.map((tweet) => (
    <div id="tweet-copy">
      <div className="tweet-feed-container">
        <a href="#" className="avatar-normal-container">
          <div className="avatar-normal"></div>
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
            <div id="tweet-info-date">{tweet.CreatedAt}</div>
            <div>
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
          <div className="tweet-div">
            <p className="tweet-div-text">{tweet.Message}</p>
            <div className="tweet-div-buttons">
              <button className="tweet-div-button">
                <i className="fas fa-exclamation-triangle"></i>
                {/*<span id="tweet-reply">{tweet.replies}</span>*/}
              </button>
              <button className="tweet-div-button tweet-main-retweet">
                <i className="fas fa-exclamation-triangle"></i>
                {/*<span id="tweet-retweet">{tweet.retweets}</span>*/}
              </button>
              <button className="tweet-div-button tweet-main-like">
                <i className="fas fa-exclamation-triangle"></i>
                {/*<span id="tweet-like">{tweet.likes}</span>*/}
              </button>
              <button className="tweet-div-button">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <>{tweetItems}</>;
}
