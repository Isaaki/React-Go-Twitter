import { useRef, useEffect, useState } from "react";
import "./TweetField.css";

export default function TweetField() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Automatically adjust height when text changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset to shrink when deleting
      textarea.style.height = `${textarea.scrollHeight}px`; // Grow to fit
    }
  }, []);

  return (
    <>
      <div className="tweet-feed-header">
        <a href="#" className="avatar-normal-container">
          <div className="avatar-normal"></div>
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
            <button id="tweet-button" className="tweet-feed-action">
              Tweet
            </button>
          </div>
        </div>
      </div>
      <div className="tweet-feed-seperator"></div>
    </>
  );
}
