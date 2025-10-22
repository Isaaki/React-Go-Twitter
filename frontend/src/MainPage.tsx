import TweetFeed from "./TweetFeed";
import TweetField from "./TweetField";
import "./MainPage.css";

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
        <TweetField />
        <TweetFeed />
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
