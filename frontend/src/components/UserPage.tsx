import { useParams } from "react-router-dom";
import { useUser } from "../context/useUser";
import { useEffect, useState } from "react";
import type { Tweet } from "../utils/types";
import TweetFeed from "./TweetFeed";
import SideBar from "./SideBar";

export default function UserPage() {
  const { currentUser } = useUser();
  const { username } = useParams();
  const [tweets, setTweets] = useState<Tweet[] | null>(null);

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
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <SideBar></SideBar>
      {tweets && <TweetFeed tweets={tweets} />}
    </div>
  );
}
