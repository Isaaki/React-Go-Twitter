import { useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetField from "./TweetField";

import type { SortModeKeyType } from "./types";
import { SortMode } from "./constants";

import "./MainPage.css";

export default function MainPage() {
  const [reloadTweetsKey, setReloadTweetsKey] = useState<number>(0);
  const [sortMode, setSortMode] = useState<SortModeKeyType>(SortMode.DEC);

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
        <input id="name" type="text" placeholder="name" />
        <input id="userName" type="text" placeholder="UserName" />
        <button id="add-user">Add user</button>
        <button id="add-tweets-to-feed">addTweetsToFeed</button>
        <button onClick={cycleSort}>Sort Mode</button>
      </div>
    </div>
  );
}
