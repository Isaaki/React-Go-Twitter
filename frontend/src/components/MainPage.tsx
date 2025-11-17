import { useEffect, useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetField from "./TweetField";

import type { Tweet } from "../utils/types";
import { SortMode } from "../utils/sortmode";
import { useSortMode } from "../context/useSortMode";

import "./MainPage.css";

export default function MainPage() {
  const [reloadTweetsKey, setReloadTweetsKey] = useState<number>(0);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const { sortMode } = useSortMode();

  useEffect(() => {
    fetch("http://localhost:8080/api/tweets")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a: Tweet, b: Tweet) => tweetSort(a, b));
        setTweets(data);
      })
      .catch(console.error);
  }, [reloadTweetsKey]);

  useEffect(() => {
    setTweets((currentTweets) => [...currentTweets].sort(tweetSort));
  }, [sortMode]);

  function tweetPosted() {
    setReloadTweetsKey((k) => k + 1);
  }

  function tweetSort(a: Tweet, b: Tweet) {
    const aDate = Date.parse(a.createdAt);
    const bDate = Date.parse(b.createdAt);

    if (sortMode === SortMode.ASC) {
      return aDate - bDate; // ascending: older first
    } else {
      return bDate - aDate; // descending: newer first
    }
  }

  return (
    <>
      <div id="div-feed" className="main-feed">
        <div className="feed-header">
          <a href="#">Home</a>
          <button className="feed-header-icon">
            <i className="fas fa-star"></i>
          </button>
        </div>
        <TweetField tweetPosted={tweetPosted} />
        <TweetFeed tweets={tweets} />
      </div>
    </>
  );
}
