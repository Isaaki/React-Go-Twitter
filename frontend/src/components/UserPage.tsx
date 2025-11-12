import { useParams } from "react-router-dom";
import { useCurrentUser } from "../context/useUser";
import { useEffect, useState } from "react";
import type { User } from "../utils/types";
import TweetFeedUser from "./TweetFeedUser";

export default function UserPage() {
  const { currentUser } = useCurrentUser();
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (username === currentUser?.username) {
      fetch(`http://localhost:8080/user/profile`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(`http://localhost:8080/api/user/?username=${username}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  // const userPageStyle = {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {user && <TweetFeedUser user={user} />}
    </div>
  );
}
