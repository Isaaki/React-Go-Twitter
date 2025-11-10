import { useParams } from "react-router-dom";
import { useCurrentUser } from "../context/useUser";

export default function UserPage() {
  const { currentUser } = useCurrentUser();

  const { username } = useParams();
  return (
    <>
      <div>{currentUser?.name}</div>
      <div>{username}</div>
    </>
  );
}
