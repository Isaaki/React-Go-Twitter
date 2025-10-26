import { useState } from "react";
import "./UserPopup.css";
import { useRequiredUser } from "../context/useUser";
import type { User } from "../utils/types";

export default function UserPopup() {
  const { currentUser, setCurrentUser } = useRequiredUser();
  const [inputUserId, setInputUserId] = useState<number>(0);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.value;
    if (id) {
      setInputUserId(parseInt(event.target.value));
      console.log(inputUserId);
    } else {
      console.error("Input not a number");
    }
  }

  function handleChangeUser() {
    fetch(`http://localhost:8080/api/user/${inputUserId}`)
      .then((res) => res.json())
      .then((data: User) => {
        const newData: User = {
          ...data,
          ID: data.ID,
          Username: data.Username,
          Name: data.Name,
          ProfilePicUrl: data.ProfilePicUrl,
        };
        setCurrentUser(newData);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(currentUser);
  }

  return (
    <>
      <div className="userPopup">
        <div className="userPopup-input">
          <input
            id="userPopupInput"
            type="number"
            placeholder="UserId"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="userPopup-button-container">
          <button
            className="userPopup-button"
            value={inputUserId}
            onClick={handleChangeUser}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
