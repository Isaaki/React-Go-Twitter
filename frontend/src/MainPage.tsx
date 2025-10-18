import Tweet from "./Tweet";
import type { User } from "./types";
import "./MainPage.css";

const testUser: User = {
  id: 1,
  name: "Isak",
  username: "isaaki",
  email: "xisaaki@proton.me",
};

const tweet = {
  user: testUser,
  likes: 10,
  replies: 100,
  retweets: 2,
  views: 10000,
  message:
    "this is a tweetthis is a tweetthis is a tweetthis is a tweetthis is a tweetthis is a tweetthis is a tweet",
  date: "20202202",
};

export default function MainPage() {
  return (
    <div id="main-content">
      <div id="div-feed" className="main-feed">
        <div className="feed-header">
          <a href="#">Home</a>
          <button className="feed-header-icon">
            <i className="fas fa-star"></i>
          </button>
        </div>
        <div className="tweet-feed-header">
          <a href="#" className="avatar-normal-container">
            <div className="avatar-normal"></div>
          </a>
          <div className="tweet-feed-box">
            <input
              id="tweet-input"
              className="tweet-feed-input"
              type="text"
              placeholder="What's happening?"
            />
            <div className="tweet-feed-scope toggle-display">
              <button className="tweet-feed-scope-container">
                <i className="fas fa-globe-europe"></i>
                <div className="tweet-feed-scope-button">
                  Everyone can reply
                </div>
              </button>
            </div>
            <hr className="toggle-display" />
            <div className="tweet-feed-buttons">
              <button className="tweet-feed-icon-container">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
              <button className="tweet-feed-icon-container">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
              <button className="tweet-feed-icon-container">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
              <button className="tweet-feed-icon-container">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
              <button className="tweet-feed-icon-container">
                <i className="fas fa-exclamation-triangle"></i>
              </button>
              <button id="tweet-button" className="tweet-feed-action">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="tweet-feed-seperator"></div>
        <Tweet tweet={tweet} />
        <Tweet tweet={tweet} />
        <Tweet tweet={tweet} />
        <Tweet tweet={tweet} />
      </div>
      <div className="side-content">
        <input id="name" type="text" placeholder="name" />
        <input id="userName" type="text" placeholder="UserName" />
        <button id="add-user">Add user</button>
        <button id="add-tweets-to-feed">addTweetsToFeed</button>
      </div>
    </div>
  );
}
