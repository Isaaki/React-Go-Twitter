import { useRef, useEffect, useState } from "react";
import "./TweetField.css";
import { useUser } from "../context/useUser";
import { Link } from "react-router-dom";

interface TweetFieldProps {
  tweetPosted?: () => void;
}

export default function TweetField({ tweetPosted }: TweetFieldProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { currentUser } = useUser();

  const tweetPost = async () => {
    if (text !== "") {
      try {
        const response = await fetch("http://localhost:8080/user/tweet", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            Message: text,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Reset text field
        setText("");
        tweetPosted?.();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`Tweet Post Error: ${err.message}`);
        } else {
          console.log(`Tweet Post Error: ${String(err)}`);
        }
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [setText]);

  if (!currentUser) {
    return <>Loading User</>;
  } else {
    return (
      <>
        <div className="tweet-feed-header">
          <Link
            to={`/user/${currentUser.username}`}
            className="avatar-normal-container"
          >
            <div className="avatar-normal">
              {currentUser.profilePicUrl && (
                <img src={currentUser.profilePicUrl}></img>
              )}
            </div>
          </Link>
          <div className="tweet-feed-box">
            <textarea
              id="tweet-input"
              className="tweet-feed-input"
              placeholder="What's happening?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
              rows={0}
              style={{
                overflow: "hidden",
                resize: "none",
              }}
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
              <button
                id="tweet-button"
                className="tweet-feed-action"
                onClick={tweetPost}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
