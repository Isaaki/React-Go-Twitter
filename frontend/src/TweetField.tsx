import { useRef, useEffect, useState } from "react";
import "./TweetField.css";

interface TweetFieldProps {
  tweetPosted?: () => void;
}

export default function TweetField({ tweetPosted }: TweetFieldProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const userID = localStorage.getItem("userID");

  const tweetPost = async () => {
    if (text !== "") {
      try {
        const response = await fetch("http://localhost:8080/api/tweet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Message: text,
            UserID: parseInt(userID ?? "-1"), // Error if null
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

  // Automatically adjust height when text changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset to shrink when deleting
      textarea.style.height = `${textarea.scrollHeight}px`; // Grow to fit
    }
  }, [setText]);

  return (
    <>
      <div className="tweet-feed-header">
        <a href="#" className="avatar-normal-container">
          <div className="avatar-normal">
            <img src={localStorage.getItem("profilePicUrl")}></img>
          </div>
        </a>
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
              <div className="tweet-feed-scope-button">Everyone can reply</div>
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
      <div className="tweet-feed-seperator"></div>
    </>
  );
}
