import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

const loginContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vh",
};

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  async function fetchUser(formData: FormData) {
    const auth = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (!auth.username) {
      console.error("Empty username");
      return;
    }
    if (!auth.password) {
      console.error("Empty password");
      return;
    }

    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(auth),
    });

    response
      .json()
      .then((data) => {
        setCurrentUser(data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="login-container">
      <form action={fetchUser} style={loginContainerStyle}>
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Username"
        ></input>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
        ></input>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
