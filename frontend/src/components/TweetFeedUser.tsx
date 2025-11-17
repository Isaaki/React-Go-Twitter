import { Link } from "react-router-dom";

import type { Tweet } from "../utils/types";
import { RelativeTimeDisplay } from "../utils/time";

import "./TweetFeed.css";

export default function TweetFeedUser({ tweets: tweets }: { tweets: Tweet[] }) {
  if (!tweets) {
    console.error("no tweets");
    return;
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
            <div className="tweet-info-container">
              <Link to={`/user/${tweet.user.username}`} className="tweet-info">
                <div className="tweet-info-text">{tweet.user.name}</div>
                <div className="tweet-info-text">@{tweet.user.username}</div>
                <div>·</div>
                <div>{RelativeTimeDisplay(new Date(tweet.createdAt))}</div>
              </Link>
              <div className="tweet-info-ellipsis">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
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

  return <div className="tweet-feed">{tweetItems}</div>;
}
