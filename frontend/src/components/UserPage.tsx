import { useParams } from "react-router-dom";
import { useUser } from "../context/useUser";
import { useEffect, useState } from "react";
import type { Tweet } from "../utils/types";
import TweetFeed from "./TweetFeed";
import SideBar from "./SideBar";
import TweetField from "./TweetField";

export default function UserPage() {
  const { currentUser } = useUser();
  const { username } = useParams();
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [reloadTweetsKey, setReloadTweetsKey] = useState<number>(0);

  useEffect(() => {
    if (username === currentUser?.username) {
      fetch(`http://localhost:8080/user/tweet`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setTweets(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(
        `http://localhost:8080/api/user/?username=${username}&tweets=true`,
        {
          method: "GET",
        },
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTweets(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [reloadTweetsKey]);

  function tweetPosted() {
    setReloadTweetsKey((k) => k + 1);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <SideBar></SideBar>
      <div>
        <div className="feed-header">
          <a href="#">Home</a>
          <button className="feed-header-icon">
            <i className="fas fa-star"></i>
          </button>
        </div>
        <TweetField tweetPosted={tweetPosted} />
        {tweets && <TweetFeed tweets={tweets} />}
      </div>
    </div>
  );
}
