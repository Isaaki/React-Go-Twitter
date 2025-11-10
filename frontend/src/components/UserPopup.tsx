import "./UserPopup.css";
import { useNavigate } from "react-router-dom";

export default function UserPopup() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  return (
    <>
      <div className="userPopup">
        <div className="userPopup-button-container">
          <button className="userPopup-button" onClick={handleLogin}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
