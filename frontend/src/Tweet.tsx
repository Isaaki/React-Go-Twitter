import type { Tweet } from "./types";
import "./Tweet.css";

export default function Tweet({ tweet }) {
  return (
    <div id="tweet-copy">
      <div className="tweet-feed-container">
        <a href="#" className="avatar-normal-container">
          <div className="avatar-normal"></div>
        </a>
        <div className="tweet-container">
          <div className="tweet-info">
            <a id="tweet-info-name" href="#">
              {tweet.user.name}
            </a>
            <a id="tweet-info-username" href="#">
              @{tweet.user.username}
            </a>
            <div>·</div>
            <div id="tweet-info-date">{tweet.date}</div>
            <div>
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
