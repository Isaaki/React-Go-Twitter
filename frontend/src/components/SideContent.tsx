import { useState } from "react";
import { useCurrentUser } from "../context/useUser";
import { SortMode } from "../utils/sortmode";

import "./SideContent.css";
import { useSortMode } from "../context/useSortMode";

export default function SideContent() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { sortMode, setSortMode } = useSortMode();
  const { setCurrentUser } = useCurrentUser();

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (profilePic) {
      const formData = new FormData();
      formData.append("file", profilePic);

      try {
        const response = await fetch(
          `http://localhost:8080/user/profilePicture`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          },
        );

        const data = await response.json();
        setCurrentUser(data);
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  function handleSortChange() {
    if (sortMode == SortMode.DEC) {
      setSortMode(SortMode.ASC);
    } else {
      setSortMode(SortMode.DEC);
    }
  }

  return (
    <div className="side-content">
      <div>
        <p>User info</p>
        <input id="name" type="text" placeholder="name" />
        <input id="userName" type="text" placeholder="UserName" />
        <button
          id="add-user"
          style={{
            border: "1px solid gray",
            padding: "4px",
            margin: "2px",
          }}
        >
          Add user
        </button>
      </div>
      <button onClick={handleSortChange}>Sort Mode</button>
      <div className="input-container">
        <input
          id="input-profile-picture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        {profilePic && <p>File name: {profilePic.name}</p>}
        {profilePic && (
          <button
            className="submit"
            style={{
              border: "1px solid gray",
              padding: "2px",
            }}
            onClick={handleProfilePictureUpload}
          >
            Upload a file
          </button>
        )}
      </div>
    </div>
  );
}
